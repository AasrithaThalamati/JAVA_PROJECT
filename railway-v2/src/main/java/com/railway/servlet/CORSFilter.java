package com.railway.servlet;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter("/api/*")
public class CORSFilter implements Filter {
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse r = (HttpServletResponse) res;
        r.setHeader("Access-Control-Allow-Origin", "*");
        r.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        r.setHeader("Access-Control-Allow-Headers", "Content-Type");
        chain.doFilter(req, res);
    }
    public void init(FilterConfig c) {}
    public void destroy() {}
}
