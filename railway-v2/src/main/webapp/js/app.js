/* ================================================================
   RailConnect Pro — Frontend Application Logic
   ================================================================ */

const API = '/railconnect/api';

// ── State ──
let state = {
  selectedTrain: null,
  travelDate: null,
  selectedClass: 'Sleeper',
  cancelTicketData: null,
};

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  // Date init
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('book-date').min = today;
  document.getElementById('book-date').value = today;

  // Clock
  updateClock();
  setInterval(updateClock, 1000);

  // Class selector
  document.querySelectorAll('.class-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.class-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.selectedClass = btn.dataset.class;
      updateFarePreview();
    });
  });

  // Load trains for seat section
  fetchTrainOptions();
});

function updateClock() {
  const now = new Date();
  document.getElementById('header-clock').textContent =
    now.toLocaleTimeString('en-IN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ── Navigation ──
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const sec = document.getElementById('section-' + name);
  if (sec) { sec.classList.remove('hidden'); sec.classList.add('active'); }
  const btn = document.querySelector(`.nav-btn[data-section="${name}"]`);
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Swap stations ──
function swapStations() {
  const from = document.getElementById('book-from');
  const to = document.getElementById('book-to');
  [from.value, to.value] = [to.value, from.value];
}

// ── BOOK: Search ──
async function searchTrains() {
  const from  = document.getElementById('book-from').value;
  const to    = document.getElementById('book-to').value;
  const date  = document.getElementById('book-date').value;

  if (!from) { toast('Please select a departure station.', 'error'); return; }
  if (!to)   { toast('Please select a destination station.', 'error'); return; }
  if (from === to) { toast('Origin and destination must be different.', 'error'); return; }
  if (!date) { toast('Please select a travel date.', 'error'); return; }

  state.travelDate = date;
  const wrap = document.getElementById('train-results-wrap');
  wrap.className = '';
  wrap.innerHTML = `<div class="panel"><div class="loading"><div class="spinner"></div>Searching available trains…</div></div>`;

  try {
    const res = await fetch(`${API}/book?from=${enc(from)}&to=${enc(to)}`);
    const data = await res.json();
    if (data.success && data.trains?.length > 0) {
      renderTrains(data.trains, from, to, date);
    } else {
      wrap.innerHTML = `<div class="panel"><div class="no-results">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
        <div>No direct trains found for <strong>${from} → ${to}</strong>.</div>
        <div style="font-size:.8rem;margin-top:.4rem">Try a different route or check back later.</div>
      </div></div>`;
    }
  } catch(e) {
    wrap.innerHTML = `<div class="panel"><div class="no-results">
      ⚡ Could not reach the server. Make sure Tomcat is running on port 8080.
    </div></div>`;
  }
}

function renderTrains(trains, from, to, date) {
  const wrap = document.getElementById('train-results-wrap');
  const dateStr = formatDate(date);
  let html = `<div class="results-label">${trains.length} train${trains.length > 1 ? 's' : ''} found · ${from} → ${to} · ${dateStr}</div>`;

  trains.forEach(t => {
    const noSeats = t.availableSeats <= 0;
    const seatsHtml = noSeats
      ? `<div class="tc-seats full">No seats</div>`
      : `<div class="tc-seats avail">✓ ${t.availableSeats} seats left</div>`;
    html += `
    <div class="train-card ${noSeats ? 'no-seats' : ''}" id="tc-${t.trainNumber}"
      onclick="${noSeats ? '' : `selectTrain(${JSON.stringify(t).replace(/"/g,'&quot;')})`}">
      <div class="tc-info">
        <div class="tc-num">${t.trainNumber}</div>
        <div class="tc-name">${t.trainName}</div>
        <span class="tc-type type-${t.type}">${t.type}</span>
      </div>
      <div class="tc-times">
        <div class="tc-time-block">
          <div class="tc-time">${t.departureTime}</div>
          <div class="tc-station">${t.from}</div>
        </div>
        <div class="tc-route-line2" style="width:70px;margin:0 0.5rem">
          <div style="text-align:center;font-size:.65rem;color:var(--text3);margin-bottom:6px">${t.duration}</div>
          <div style="height:1px;background:linear-gradient(90deg,transparent,var(--text3),transparent);position:relative">
            <span style="position:absolute;right:-4px;top:-7px;font-size:8px;color:var(--text3)">▶</span>
          </div>
        </div>
        <div class="tc-time-block">
          <div class="tc-time">${t.arrivalTime}</div>
          <div class="tc-station">${t.to}</div>
        </div>
      </div>
      <div class="tc-meta">
        <div class="tc-fare-label">Base fare</div>
        <div class="tc-fare">₹${t.baseFare}</div>
        ${seatsHtml}
        <div class="tc-select-hint">${noSeats ? '' : 'Click to select'}</div>
      </div>
    </div>`;
  });

  wrap.innerHTML = html;
}

function selectTrain(train) {
  state.selectedTrain = train;
  document.querySelectorAll('.train-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById('tc-' + train.trainNumber);
  if (card) {
    card.classList.add('selected');
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  const strip = document.getElementById('selected-train-strip');
  strip.innerHTML = `
    <div class="selected-strip">
      <div class="ss-item"><div class="ss-label">Train</div><div class="ss-train">${train.trainNumber} · ${train.trainName}</div></div>
      <div class="ss-item"><div class="ss-label">Route</div><div class="ss-value">${train.from} → ${train.to}</div></div>
      <div class="ss-item"><div class="ss-label">Date</div><div class="ss-value">${formatDate(state.travelDate)}</div></div>
      <div class="ss-item"><div class="ss-label">Departs</div><div class="ss-value">${train.departureTime}</div></div>
      <div class="ss-item"><div class="ss-label">Duration</div><div class="ss-value">${train.duration}</div></div>
    </div>`;

  const panel = document.getElementById('panel-passenger');
  panel.classList.remove('hidden');
  updateFarePreview();
  setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function updateFarePreview() {
  const preview = document.getElementById('fare-preview');
  if (!state.selectedTrain) { preview.innerHTML = ''; return; }
  const base = state.selectedTrain.baseFare;
  const multipliers = { 'Sleeper': 1, 'AC 3-Tier': 1.5, 'AC 2-Tier': 2.0, 'AC First Class': 2.8 };
  const mult = multipliers[state.selectedClass] || 1;
  const fare = Math.round(base * mult);
  preview.innerHTML = `
    <div class="fare-preview-left">
      Estimated fare for <strong>${state.selectedClass}</strong>
      <div style="font-size:.72rem;color:var(--text3);margin-top:2px">Base ₹${base} × ${mult} = final fare</div>
    </div>
    <div class="fare-preview-right">₹${fare.toLocaleString('en-IN')}</div>`;
}

async function bookTicket() {
  const name   = document.getElementById('p-name').value.trim();
  const age    = document.getElementById('p-age').value;
  const gender = document.getElementById('p-gender').value;

  if (!name)  { toast('Passenger name is required.', 'error'); return; }
  if (name.length < 2) { toast('Enter a valid full name.', 'error'); return; }
  if (!age || age < 1 || age > 120) { toast('Enter a valid age (1–120).', 'error'); return; }
  if (!state.selectedTrain) { toast('Please select a train first.', 'error'); return; }

  const btn = event.target.closest('button');
  btn.disabled = true;
  btn.innerHTML = `<div class="spinner" style="border-top-color:#000;width:16px;height:16px;margin:0 auto"></div>`;

  try {
    const fd = new URLSearchParams();
    fd.append('passengerName', name);
    fd.append('age', age);
    fd.append('gender', gender);
    fd.append('trainNumber', state.selectedTrain.trainNumber);
    fd.append('travelDate', state.travelDate);
    fd.append('seatClass', state.selectedClass);

    const res = await fetch(`${API}/book`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: fd });
    const data = await res.json();

    if (data.success && data.ticket) {
      showBookingSuccess(data.ticket);
      toast('Booking confirmed! Save your PNR.', 'success');
    } else {
      toast(data.message || 'Booking failed. Please try again.', 'error');
    }
  } catch(e) {
    toast('Server error. Ensure Tomcat is running on port 8080.', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg> Confirm Booking`;
  }
}

function showBookingSuccess(ticket) {
  document.getElementById('panel-search').classList.add('hidden');
  document.getElementById('panel-passenger').classList.add('hidden');
  document.getElementById('train-results-wrap').innerHTML = '';

  document.getElementById('ticket-card').innerHTML = buildTicketCard(ticket);
  document.getElementById('panel-success').classList.remove('hidden');
  document.getElementById('panel-success').scrollIntoView({ behavior: 'smooth' });

  // Store for print
  window._lastTicket = ticket;
}

function buildTicketCard(ticket) {
  const statusCls = ticket.status === 'CONFIRMED' ? 'status-CONFIRMED' : 'status-CANCELLED';
  return `
  <div class="ticket-card">
    <div class="tc-header">
      <div class="tc-header-left">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        <div class="tc-header-brand">RailConnect Pro<span>Ticket Receipt</span></div>
      </div>
      <div class="tc-pnr">${ticket.ticketId}</div>
    </div>
    <div class="tc-body">
      <div class="tc-route-display">
        <div>
          <div class="tc-city">${ticket.from}</div>
          <div style="font-size:.72rem;color:var(--text2)">${ticket.trainNumber.slice(-2) + ':' + '00'}</div>
        </div>
        <div class="tc-route-mid" style="flex:1;padding:0 1.5rem">
          <div class="dur" style="margin-bottom:6px">via ${ticket.trainName}</div>
          <div class="tc-route-line2"></div>
        </div>
        <div style="text-align:right">
          <div class="tc-city">${ticket.to}</div>
          <div style="font-size:.72rem;color:var(--text2)">${ticket.travelDate}</div>
        </div>
      </div>
      <div class="tc-grid">
        <div class="tc-field"><div class="tc-field-label">Passenger</div><div class="tc-field-value">${ticket.passengerName}</div></div>
        <div class="tc-field"><div class="tc-field-label">Age / Gender</div><div class="tc-field-value">${ticket.age} / ${ticket.gender || 'N/A'}</div></div>
        <div class="tc-field"><div class="tc-field-label">Class</div><div class="tc-field-value">${ticket.seatClass}</div></div>
        <div class="tc-field"><div class="tc-field-label">Seat</div><div class="tc-field-value gold">${ticket.seatNumber}</div></div>
        <div class="tc-field"><div class="tc-field-label">Travel Date</div><div class="tc-field-value">${formatDate(ticket.travelDate)}</div></div>
        <div class="tc-field"><div class="tc-field-label">Fare Paid</div><div class="tc-field-value gold">₹${ticket.fare.toLocaleString('en-IN')}</div></div>
        <div class="tc-field"><div class="tc-field-label">Booked On</div><div class="tc-field-value">${ticket.bookedOn || 'Today'}</div></div>
        <div class="tc-field"><div class="tc-field-label">Status</div><div class="tc-field-value ${statusCls}">${ticket.status}</div></div>
      </div>
    </div>
    <div class="tc-footer">
      <div class="tc-qr">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text3)" stroke-width="1.5">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          <rect x="5" y="5" width="3" height="3" fill="var(--text3)"/><rect x="16" y="5" width="3" height="3" fill="var(--text3)"/>
          <rect x="5" y="16" width="3" height="3" fill="var(--text3)"/><rect x="14" y="14" width="3" height="3" fill="var(--text3)"/>
          <rect x="18" y="18" width="3" height="3" fill="var(--text3)"/>
        </svg>
      </div>
      <div class="tc-footer-msg">Valid for travel on ${formatDate(ticket.travelDate)}<br>Present this ticket at the time of boarding</div>
    </div>
  </div>`;
}

function resetToSearch() {
  document.getElementById('panel-passenger').classList.add('hidden');
  state.selectedTrain = null;
  document.querySelectorAll('.train-card').forEach(c => c.classList.remove('selected'));
}

function resetBooking() {
  document.getElementById('panel-success').classList.add('hidden');
  document.getElementById('panel-search').classList.remove('hidden');
  document.getElementById('train-results-wrap').innerHTML = '';
  document.getElementById('p-name').value = '';
  document.getElementById('p-age').value = '';
  state.selectedTrain = null; state.travelDate = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function printTicket() {
  if (!window._lastTicket) return;
  const pa = document.getElementById('print-area');
  pa.innerHTML = buildTicketCard(window._lastTicket);
  window.print();
}

// ── CANCEL ──
async function fetchForCancel() {
  const id = document.getElementById('cancel-pnr').value.trim().toUpperCase();
  if (!id) { toast('Please enter a PNR / Ticket ID.', 'error'); return; }

  try {
    const res = await fetch(`${API}/cancel?ticketId=${enc(id)}`);
    const data = await res.json();
    if (data.success && data.ticket) {
      state.cancelTicketData = data.ticket;
      showCancelPreview(data.ticket);
    } else {
      toast(data.message || 'Ticket not found.', 'error');
    }
  } catch(e) {
    toast('Server error. Ensure Tomcat is running.', 'error');
  }
}

function showCancelPreview(ticket) {
  const statusColor = ticket.status === 'CONFIRMED' ? 'var(--teal)' : 'var(--red)';
  const cancelBtn = document.getElementById('confirm-cancel-btn');

  document.getElementById('cancel-ticket-card').innerHTML = `
    <div class="cancel-ticket-view">
      <div class="ctv-row"><div class="ctv-label">PNR / Ticket ID</div><div class="ctv-value" style="color:var(--gold);letter-spacing:1.5px;font-family:'Playfair Display',serif">${ticket.ticketId}</div></div>
      <div class="ctv-row"><div class="ctv-label">Passenger</div><div class="ctv-value">${ticket.passengerName} · Age ${ticket.age}${ticket.gender ? ' · ' + ticket.gender : ''}</div></div>
      <div class="ctv-row"><div class="ctv-label">Train</div><div class="ctv-value">${ticket.trainNumber} — ${ticket.trainName}</div></div>
      <div class="ctv-row"><div class="ctv-label">Route</div><div class="ctv-value">${ticket.from} → ${ticket.to}</div></div>
      <div class="ctv-row"><div class="ctv-label">Date of Travel</div><div class="ctv-value">${formatDate(ticket.travelDate)}</div></div>
      <div class="ctv-row"><div class="ctv-label">Seat / Class</div><div class="ctv-value">${ticket.seatNumber} · ${ticket.seatClass}</div></div>
      <div class="ctv-row"><div class="ctv-label">Amount Paid</div><div class="ctv-value" style="color:var(--gold)">₹${ticket.fare.toLocaleString('en-IN')}</div></div>
      <div class="ctv-row"><div class="ctv-label">Status</div><div class="ctv-value" style="color:${statusColor};font-weight:700">${ticket.status}</div></div>
    </div>`;

  if (ticket.status === 'CANCELLED') {
    cancelBtn.style.display = 'none';
    document.querySelector('.warn-banner').style.display = 'none';
  } else {
    cancelBtn.style.display = '';
    document.querySelector('.warn-banner').style.display = '';
  }

  document.getElementById('panel-cancel-preview').classList.remove('hidden');
  document.getElementById('panel-cancel-done').classList.add('hidden');
  document.getElementById('panel-cancel-preview').scrollIntoView({ behavior: 'smooth' });
}

async function confirmCancel() {
  const id = document.getElementById('cancel-pnr').value.trim().toUpperCase();
  const btn = document.getElementById('confirm-cancel-btn');
  btn.disabled = true; btn.textContent = 'Processing…';

  try {
    const fd = new URLSearchParams(); fd.append('ticketId', id);
    const res = await fetch(`${API}/cancel`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: fd });
    const data = await res.json();

    if (data.success) {
      document.getElementById('panel-cancel-preview').classList.add('hidden');
      document.getElementById('panel-cancel-done').classList.remove('hidden');
      toast('Ticket cancelled. Refund initiated.', 'success');
    } else {
      toast(data.message || 'Cancellation failed.', 'error');
    }
  } catch(e) {
    toast('Server error.', 'error');
  } finally {
    btn.disabled = false; btn.textContent = 'Cancel This Ticket';
  }
}

function clearCancel() {
  document.getElementById('cancel-pnr').value = '';
  document.getElementById('panel-cancel-preview').classList.add('hidden');
  document.getElementById('panel-cancel-done').classList.add('hidden');
  state.cancelTicketData = null;
}

// ── SEATS ──
async function fetchTrainOptions() {
  try {
    const res = await fetch(`${API}/seats`);
    const data = await res.json();
    if (data.success && data.trains) {
      const sel = document.getElementById('seats-select');
      data.trains.forEach(t => {
        const o = document.createElement('option');
        o.value = t.trainNumber;
        o.textContent = `${t.trainNumber} · ${t.trainName}  (${t.from} → ${t.to})`;
        sel.appendChild(o);
      });
    }
  } catch(e) { console.warn('Could not load trains for seat selector.'); }
}

async function loadSeats() {
  const num = document.getElementById('seats-select').value;
  if (!num) { toast('Please select a train.', 'error'); return; }

  const wrap = document.getElementById('seat-map-wrap');
  wrap.className = '';
  wrap.innerHTML = `<div class="panel"><div class="loading"><div class="spinner"></div>Loading seat map…</div></div>`;

  try {
    const res = await fetch(`${API}/seats?trainNumber=${enc(num)}`);
    const data = await res.json();
    if (data.success && data.seatMap) {
      renderSeatMap(data.train, data.seatMap, data.availableCount, data.totalCount);
    } else {
      wrap.innerHTML = `<div class="panel"><p style="color:var(--red)">${data.message || 'Failed to load.'}</p></div>`;
    }
  } catch(e) {
    wrap.innerHTML = `<div class="panel"><p style="color:var(--red)">Server error. Ensure Tomcat is running.</p></div>`;
  }
}

function renderSeatMap(train, seatMap, available, total) {
  const booked = total - available;
  const pct = Math.round((available / total) * 100);

  let seatsHtml = '';
  for (const [seat, status] of Object.entries(seatMap)) {
    const cls = status === 'AVAILABLE' ? 'avail' : 'booked';
    const icon = status === 'AVAILABLE' ? '💺' : '🚫';
    seatsHtml += `<div class="seat-cell ${cls}" title="${seat}: ${status}"><span class="seat-icon">${icon}</span>${seat}</div>`;
  }

  document.getElementById('seat-map-wrap').innerHTML = `
  <div class="seat-map-panel">
    <div class="sm-train-info">
      <div class="sm-train-name">${train.trainNumber} · ${train.trainName}</div>
      <div class="sm-train-route">${train.from} → ${train.to} &nbsp;|&nbsp; Dep: ${train.departureTime} &nbsp;|&nbsp; Arr: ${train.arrivalTime} &nbsp;|&nbsp; ${train.duration}</div>
    </div>
    <div class="sm-stats">
      <div class="sm-stat"><div class="sm-stat-num avail">${available}</div><div class="sm-stat-label">Available</div></div>
      <div class="sm-divider"></div>
      <div class="sm-stat"><div class="sm-stat-num booked">${booked}</div><div class="sm-stat-label">Occupied</div></div>
      <div class="sm-divider"></div>
      <div class="sm-stat"><div class="sm-stat-num" style="color:var(--text2)">${pct}%</div><div class="sm-stat-label">Free</div></div>
    </div>
    <div class="sm-legend">
      <div class="legend-item"><div class="legend-dot avail"></div> Available</div>
      <div class="legend-item"><div class="legend-dot booked"></div> Booked / Occupied</div>
    </div>
    <div class="seat-grid">${seatsHtml}</div>
  </div>`;
}

// ── Utilities ──
function formatDate(str) {
  if (!str) return '';
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function enc(s) { return encodeURIComponent(s); }

let _toastId = 0;
function toast(msg, type = 'info', sub = '') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const container = document.getElementById('toast-container');
  const id = ++_toastId;
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.id = 'toast-' + id;
  el.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span><div><div class="toast-text">${msg}</div>${sub ? `<div class="toast-sub">${sub}</div>` : ''}</div>`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('dying');
    setTimeout(() => el.remove(), 350);
  }, 3500);
}
