package com.railway.servlet;

import com.google.gson.Gson;
import com.railway.dao.RailwayDAO;
import com.railway.model.Ticket;
import com.railway.model.Train;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;

@WebServlet("/api/book")
public class BookTicketServlet extends HttpServlet {
    private final RailwayDAO dao = new RailwayDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        json(resp);
        String from = req.getParameter("from");
        String to   = req.getParameter("to");
        Map<String, Object> result = new HashMap<>();

        if (from != null && to != null && !from.isEmpty() && !to.isEmpty()) {
            List<Train> trains = dao.searchTrains(from, to);
            result.put("success", true);
            result.put("trains", trains);
            result.put("count", trains.size());
        } else {
            result.put("success", true);
            result.put("trains", dao.getAllTrains());
            result.put("stations", dao.getStations());
        }
        resp.getWriter().print(gson.toJson(result));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        json(resp);
        Map<String, Object> result = new HashMap<>();
        try {
            String name       = req.getParameter("passengerName");
            int    age        = Integer.parseInt(req.getParameter("age"));
            String gender     = req.getParameter("gender");
            String trainNum   = req.getParameter("trainNumber");
            String date       = req.getParameter("travelDate");
            String seatClass  = req.getParameter("seatClass");

            Ticket ticket = dao.bookTicket(name, age, gender, trainNum, date, seatClass);
            if (ticket != null) {
                result.put("success", true);
                result.put("ticket", ticket);
            } else {
                result.put("success", false);
                result.put("message", "Booking failed — no seats available or invalid train.");
            }
        } catch (Exception e) {
            result.put("success", false);
            result.put("message", "Error: " + e.getMessage());
        }
        resp.getWriter().print(gson.toJson(result));
    }

    private void json(HttpServletResponse r) {
        r.setContentType("application/json");
        r.setCharacterEncoding("UTF-8");
    }
}
