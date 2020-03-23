let patientListDemo = require("./patientLocal.json");

const SERVER = "https://localhost:5001/api/";

const moment = require("moment");

const patientLocalData = () => {
  return bundleData(patientListDemo);
};

function bundleData(json) {
  let result = [];
  for (let bundle of json) {
    result = result.concat(bundle.entry);
  }
  console.log(result);
  return result;
}

function requestPatientList() {
  return new Promise((resolve, reject) => {
    let localCache = localStorage.getItem("patients");
    if (localCache) {
      setTimeout(() => {
        resolve(JSON.parse(localCache));
      }, 1000);
    } else {
      fetch(SERVER + "Patient/")
        .then(async (res) => {
          let json = await res.json();
          json = bundleData(json);
          localStorage.setItem("patients", JSON.stringify(json));
          resolve(json);
        })
        .catch((e) => {
          reject(e);
          console.log(e);
          console.log("Network Error: Local demo data is loaded");
          resolve(patientLocalData());
        });
    }
  });
}

function parseAllPatientData(patients) {
  const data = [];
  patients.forEach((elementRaw) => {
    if (!elementRaw) {
      return null;
    }
    let element = elementRaw.resource;
    let patient = {};
    patient.name =
      element.name?.[0]?.family + " " + element.name?.[0]?.given?.[0];
    patient.id = element.id;
    patient.phone = element.telecom?.[0]?.value;
    patient.language = element.communication?.[0]?.language?.text;
    patient.maritalStatus = element.maritalStatus?.text;
    patient.address = element.address?.[0]?.line[0];
    patient.city = element.address?.[0]?.city;
    patient.state = element.address?.[0]?.state;
    patient.country = element.address?.[0]?.country;
    patient.gender = element.gender;
    patient.birthDate = element.birthDate;
    patient.age = moment().diff(element.birthDate, "years");
    patient.raw = elementRaw;
    data.push(patient);
  });

  return data;
}

export { requestPatientList, parseAllPatientData };
