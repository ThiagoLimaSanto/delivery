import { useContext } from "react";
import { SocketContext } from "../context/socket/WebSockerContext";

export function useSocket() {
  return useContext(SocketContext);
}