const smi = require('./smi');

// Console Log to ensure nvidia-smi is working 
smi(function (err, smi) {
    if (err) {
        console.warn(err);
        process.exit(1);
    }
    console.log(smi)
});
