FROM python:3.9-slim
WORKDIR /app
COPY . /app/
RUN pip install grpcio grpcio-tools
EXPOSE 50051
CMD ["python", "server.py"]