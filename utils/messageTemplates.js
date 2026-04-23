exports.getTemplate = (name, vehicle, count) => {
    if (count == 1) {
        return `Warning: ${name}, your vehicle ${vehicle} exceeded speed limit.`;
    } 
    else if (count == 2) {
        return `Final Warning: ${name}, repeated overspeeding detected.`;
    } 
    else {
        return `Serious Alert: ${vehicle} violated rules multiple times.`;
    }
};