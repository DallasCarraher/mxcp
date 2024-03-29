import { http } from "msw";
import { setupServer } from "msw/node";

// put one-off handlers that don't really need an entire file to themselves here
const miscHandlers = [
  http.post(`${process.env.REMIX_DEV_HTTP_ORIGIN}/ping`, (req) =>
    req.passthrough(),
  ),
];

const server = setupServer(...miscHandlers);

server.listen({ onUnhandledRequest: "bypass" });

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
