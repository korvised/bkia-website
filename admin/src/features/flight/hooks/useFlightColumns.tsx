import { useMemo } from "react";
import { asset, cn } from "@/lib";
import { formatDate, formatTime } from "@/lib/utils";
import { FlightStatusBadge } from "../components";
import type { IFlight } from "../types";
import type { Column } from "@/components/ui";

export const useFlightColumns = () => {
  const columns: Column<IFlight>[] = useMemo(
    () => [
      {
        key: "flightNo",
        header: "Flight No",
        sortable: true,
        render: (flight) => (
          <span className="font-medium text-gray-900">{flight.flightNo}</span>
        ),
      },
      {
        key: "airline",
        header: "Airline",
        render: (flight) => (
          <div className="flex items-center gap-2">
            {flight.airline.logoFile && (
              <img
                src={asset(flight.airline.logoFile.path)}
                alt={flight.airline.name}
                className="h-6 w-6 object-contain"
              />
            )}
            <span>{flight.airline.name}</span>
          </div>
        ),
      },
      {
        key: "route",
        header: "Route",
        render: (flight) => (
          <span>
            {flight.route.origin.code} → {flight.route.destination.code}
          </span>
        ),
      },
      {
        key: "type",
        header: "Type",
        sortable: true,
        render: (flight) => (
          <span className="capitalize">{flight.type.toLowerCase()}</span>
        ),
      },
      {
        key: "operationDate",
        header: "Date",
        sortable: true,
        render: (flight) => <span>{formatDate(flight.operationDate)}</span>,
      },
      {
        key: "scheduledDepTime",
        header: "Departure",
        sortable: true,
        render: (flight) => (
          <div>
            {flight.actualDepTime && (
              <div>{formatTime(flight.actualDepTime)}</div>
            )}
            <div
              className={cn(
                flight.actualDepTime && "text-xs text-gray-400 line-through",
              )}
            >
              {formatTime(flight.scheduledDepTime)}
            </div>
          </div>
        ),
      },
      {
        key: "scheduledArrTime",
        header: "Arrival",
        sortable: true,
        render: (flight) => (
          <div>
            {flight.actualArrTime && (
              <div>{formatTime(flight.actualArrTime)}</div>
            )}
            <div
              className={cn(
                flight.actualArrTime && "text-xs text-gray-400 line-through",
              )}
            >
              {formatTime(flight.scheduledArrTime)}
            </div>
          </div>
        ),
      },
      {
        key: "terminal",
        header: "Terminal",
        render: (flight) => (
          <span className="bg-secondary-100 text-secondary-700 inline-flex h-8 w-8 items-center justify-center rounded-full font-medium">
            {flight.terminal}
          </span>
        ),
      },
      {
        key: "gate",
        header: "Gate",
        render: (flight) => flight.gate || "-",
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        render: (flight) => <FlightStatusBadge status={flight.status} />,
      },
    ],
    [],
  );

  return columns;
};
