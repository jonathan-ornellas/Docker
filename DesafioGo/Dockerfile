FROM golang:alpine as builder

WORKDIR /app
COPY main.go .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags '-extldflags "-static"' -o fullcycle main.go

FROM scratch
COPY --from=builder /app/fullcycle .
CMD ["./fullcycle"]
