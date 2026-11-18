// Get saved reports
function getReports() {
    return JSON.parse(localStorage.getItem("segreReports")) || [];
}

// Save reports
function saveReports(reports) {
    localStorage.setItem("segreReports", JSON.stringify(reports));
}

// Submit waste report
document.getElementById("wasteForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const household = document.getElementById("household").value;
    const location = document.getElementById("location").value;
    const wasteType = document.getElementById("wasteType").value;
    const description = document.getElementById("description").value;

    const report = {
        household: household,
        location: location,
        wasteType: wasteType,
        description: description,
        date: new Date().toLocaleString()
    };

    let reports = getReports();
    reports.push(report);
    saveReports(reports);

    document.getElementById("message").innerText =
        "Report submitted successfully! Thank you.";

    this.reset();
    updateDashboard();
});

// Update dashboard
function updateDashboard() {
    const reports = getReports();

    const segregated = reports.filter(r =>
        r.wasteType === "Wet Waste" ||
        r.wasteType === "Dry Waste"
    ).length;

    const mixed = reports.filter(r =>
        r.wasteType === "Mixed Waste"
    ).length;

    document.getElementById("totalReports").innerText = reports.length;
    document.getElementById("segregated").innerText = segregated;
    document.getElementById("mixed").innerText = mixed;

    const reportList = document.getElementById("reportList");

    reportList.innerHTML = "";

    reports.slice().reverse().forEach(report => {
        reportList.innerHTML += `
            <div class="report-item">
                <h3>${report.household}</h3>
                <p><b>Location:</b> ${report.location}</p>
                <p><b>Waste:</b> ${report.wasteType}</p>
                <p><b>Description:</b> ${report.description}</p>
                <small>${report.date}</small>
            </div>
        `;
    });
}

// Load dashboard when page opens
updateDashboard();// Generate Household QR Code
const qrBox = document.getElementById("qrcode");

if (qrBox && typeof QRCode !== "undefined") {
    new QRCode(qrBox, {
        text: "Household ID: H101",
        width: 150,
        height: 150
    });
}

// Update household status
function markStatus(status) {
    const householdStatus =
    localStorage.getItem("H101_status") || "Not Updated";

document.getElementById("householdStatus").innerText =
    householdStatus;
}
