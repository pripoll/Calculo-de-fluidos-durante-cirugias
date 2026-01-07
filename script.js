function calculateFluids() {
    const weight = parseFloat(document.getElementById('weight').value);
    const npo = parseFloat(document.getElementById('npo').value);
    const evapRate = parseFloat(document.getElementById('surgery').value);

    if (isNaN(weight) || isNaN(npo)) {
        alert('DATA MISSING: Ingrese parámetros biométricos.');
        return;
    }

    let maintenance;
    if (weight > 40) {
        maintenance = weight + 40;
    } else {
        if (weight <= 10) maintenance = weight * 4;
        else if (weight <= 20) maintenance = 40 + (weight - 10) * 2;
        else maintenance = 60 + (weight - 20) * 1;
    }

    const deficit = maintenance * npo;
    const evapLoss = weight * evapRate;

    const hourlyData = [
        maintenance + (deficit * 0.5) + evapLoss,
        maintenance + (deficit * 0.25) + evapLoss,
        maintenance + (deficit * 0.25) + evapLoss,
        maintenance + evapLoss,
        maintenance + evapLoss,
        maintenance + evapLoss
    ];

    const resultsDiv = document.getElementById('results');
    let html = `
        <div class="data-point"><span>MANTENIMIENTO</span><strong>${maintenance.toFixed(0)} ml/h</strong></div>
        <div class="data-point"><span>DÉFICIT NPO</span><strong>${deficit.toFixed(0)} ml</strong></div>
        <div class="data-point full-width"><span>PÉRDIDAS POR EVAPORACIÓN</span><strong>${evapLoss.toFixed(0)} ml/h</strong></div>
    `;

    hourlyData.forEach((val, index) => {
        html += `<div class="data-point"><span>HORA ${index + 1}</span><strong>${val.toFixed(0)} ml</strong></div>`;
    });

    resultsDiv.innerHTML = html;
}
