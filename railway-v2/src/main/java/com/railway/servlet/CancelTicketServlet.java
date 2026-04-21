package com.railway.servlet;

import com.google.gson.Gson;
import com.railway.dao.RailwayDAO;
import com.railway.model.Ticket;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;

@WebServlet("/api/cancel")
public class CancelTicketServlet extends HttpServlet {
    private final RailwayDAO dao = new RailwayDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        json(resp);
        String id = req.getParameter("ticketId");
        Map<String, Object> result = new HashMap<>();
        if (id == null || id.isEmpty()) {
            result.put("success", false); result.put("message", "Ticket ID required.");
        } else {
            Ticket t = dao.getTicket(id.toUpperCase());
            if (t != null) { result.put("success", true); result.put("ticket", t); }
            else { result.put("success", false); result.put("message", "No ticket found: " + id.toUpperCase()); }
        }
        resp.getWriter().print(gson.toJson(result));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        json(resp);
        String id = req.getParameter("ticketId");
        Map<String, Object> result = new HashMap<>();
        if (id == null || id.isEmpty()) {
            result.put("success", false); result.put("message", "Ticket ID required.");
        } else {
            boolean ok = dao.cancelTicket(id.toUpperCase());
            result.put("success", ok);
            result.put("message", ok
                ? "Ticket " + id.toUpperCase() + " cancelled. Refund in 5–7 business days."
                : "Cancellation failed — ticket may not exist or is already cancelled.");
        }
        resp.getWriter().print(gson.toJson(result));
    }

    private void json(HttpServletResponse r) {
        r.setContentType("application/json"); r.setCharacterEncoding("UTF-8");
    }
}
