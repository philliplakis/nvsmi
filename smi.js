// Original code written by chrisallenlane
// I have modified to support Windows 10 Pro
// https://www.npmjs.com/package/node-nvidia-smi

const exec = require('child_process').exec;
const xml = require('xml2js').parseString;
const os = require('os');

module.exports = function (callback) {
    if (os.platform() === 'win32') {
        exec('"C:/Program Files/NVIDIA Corporation/NVSMI/nvidia-smi" -q -x', function (err, stdout, stderr) {
            if (err) {
                return callback(err);
            }
            if (stderr) {
                return callback(stderr);
            }
            const options = {
                explicitArray: false,
                trim: true,
            };
            xml(stdout, options, function (err, data) {
                if (err) {
                    return callback(err);
                }
                return callback(null, data);
            });
        });
    } else exec('nvidia-smi -q -x', function (err, stdout, stderr) {
        if (err) {
            return callback(err);
        }
        if (stderr) {
            return callback(stderr);
        }
        const options = {
            explicitArray: false,
            trim: true,
        };
        xml(stdout, options, function (err, data) {
            if (err) {
                return callback(err);
            }
            return callback(null, data);
        });
    });
};
