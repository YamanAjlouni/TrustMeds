// data/prescriptionData.js
export const prescriptionData = [
    {
        id: 'RX-12345',
        patientName: 'Ahmed Hassan',
        patientId: 'PT-1234',
        date: '2025-04-10',
        medications: [
            {
                name: 'Amlodipine',
                dosage: '5mg',
                frequency: 'Once daily',
                duration: '30 days',
                refills: 2
            }
        ],
        status: 'Declined',
        pharmacy: 'Main Street Pharmacy',
        notes: 'Insurance coverage issue. Patient needs prior authorization.',
        declineReason: 'Insurance requires prior authorization'
    }
]