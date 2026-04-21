package com.railway.servlet;

import com.google.gson.Gson;
import com.railway.dao.RailwayDAO;
import com.railway.model.Train;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.*;
import java.util.*;

@WebServlet("/api/seats")
public class ViewSeatsServlet extends HttpServlet {
    private final RailwayDAO dao = new RailwayDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        String trainNumber = req.getParameter("trainNumber");
        Map<String, Object> result = new HashMap<>();

        if (trainNumber == null || trainNumber.isEmpty()) {
            result.put("success", true);
            result.put("trains", dao.getAllTrains());
        } else {
            Train train = dao.getTrainByNumber(trainNumber);
            Map<String, String> seatMap = dao.getSeatMap(trainNumber);
            if (seatMap != null && train != null) {
                long available = seatMap.values().stream().filter("AVAILABLE"::equals).count();
                result.put("success", true);
                result.put("train", train);
                result.put("seatMap", seatMap);
                result.put("availableCount", available);
                result.put("totalCount", seatMap.size());
            } else {
                result.put("success", false);
                result.put("message", "Train not found: " + trainNumber);
            }
        }
        resp.getWriter().print(gson.toJson(result));
    }
}
