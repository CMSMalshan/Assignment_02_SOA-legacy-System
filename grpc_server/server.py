import grpc
from concurrent import futures
import time

# Import the generated classes
import hospital_pb2
import hospital_pb2_grpc

# Implement the service logic
class HospitalService(hospital_pb2_grpc.HospitalServiceServicer):
    
    def GetPatientRecord(self, request, context):
        # Basic Input Validation
        if not request.patient_id:
            context.abort(grpc.StatusCode.INVALID_ARGUMENT, "Patient ID cannot be empty")
            
        print(f"[Server] Fetching record for patient: {request.patient_id}")
        
        # Mock response
        return hospital_pb2.PatientResponse(
            patient_id=request.patient_id,
            name="Kasun Perera",
            age=25,
            blood_group="O+"
        )

    def AddMedicalReport(self, request, context):
        # Basic Input Validation
        if not request.patient_id or not request.report_details:
            context.abort(grpc.StatusCode.INVALID_ARGUMENT, "Missing patient ID or report details")
            
        print(f"[Server] Adding report for patient: {request.patient_id}")
        
        # Mock response
        return hospital_pb2.ReportResponse(
            success=True,
            message="Report added successfully"
        )

    def CheckDoctorAvailability(self, request, context):
        # Basic Input Validation
        if not request.doctor_id:
            context.abort(grpc.StatusCode.INVALID_ARGUMENT, "Doctor ID cannot be empty")
            
        print(f"[Server] Checking availability for doctor: {request.doctor_id}")
        
        # Mock response
        return hospital_pb2.DoctorResponse(
            doctor_name="Dr. Silva",
            is_available=True,
            available_time="18:00 - 20:00"
        )

def serve():
    # Setup gRPC server with thread pool
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    hospital_pb2_grpc.add_HospitalServiceServicer_to_server(HospitalService(), server)
    
    # Bind to port 50051
    server.add_insecure_port('[::]:50051')
    print("gRPC Server is running on port 50051...")
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()