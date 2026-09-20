const soap = require('soap');

// WSDL URL of the Translating Gateway
const url = 'http://localhost:8000/wsdl?wsdl';

console.log("Starting SOAP Client...");

// Create the SOAP client instance
soap.createClient(url, function(err, client) {
    if (err) {
        console.error("Error creating SOAP client:", err);
        return;
    }

    console.log("SOAP Client connected successfully!\n");

    // 1. Test GetPatientRecord Operation
    const patientRequest = { patient_id: "P001" };
    client.GetPatientRecord(patientRequest, function(err, result) {
        if (err) {
            console.error("GetPatientRecord Error:", err.Fault ? err.Fault.Reason.Text : err);
        } else {
            console.log("--- GetPatientRecord Response ---");
            console.log(result);
        }
    });

    // 2. Test AddMedicalReport Operation
    const reportRequest = { patient_id: "P001", report_details: "Blood test normal" };
    client.AddMedicalReport(reportRequest, function(err, result) {
        if (err) {
            console.error("AddMedicalReport Error:", err.Fault ? err.Fault.Reason.Text : err);
        } else {
            console.log("--- AddMedicalReport Response ---");
            console.log(result);
        }
    });

    // 3. Test CheckDoctorAvailability Operation
    const doctorRequest = { doctor_id: "D001" };
    client.CheckDoctorAvailability(doctorRequest, function(err, result) {
        if (err) {
            console.error("CheckDoctorAvailability Error:", err.Fault ? err.Fault.Reason.Text : err);
        } else {
            console.log("--- CheckDoctorAvailability Response ---");
            console.log(result);
            console.log("---------------------------------\n");
        }
    });
});