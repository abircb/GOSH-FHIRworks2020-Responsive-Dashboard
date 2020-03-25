# 🔥 FHIR Responsive Dashboard Application

This project was created as part of __UCL's COMP0016: Systems Engineering__ course.  

The goal of the task was to use synthetically generated data retrieved over FHIR from a GOSH gateway to
demonstrate capabilities and advantages of the FHIR standard for the collection and safe handling
of healthcare data. This approach will support the development of various healthcare apps, for
patients, families and healthcare professionals, like existing phone apps used regularly by
millions.

HL7 FHIR is a next generation standards JSON based framework that leverages the latest web
standards and includes a RESTful API. FHIR interoperability ensures data is collected, accessed,
and used in a safe and secure manner.
 
Read more about FHIR [here](https://wiki.hl7.org/FHIR)
 
---

For my solution, I chose a combination of a couple of themes provided to us: __2. Graphing data from FHIR records__ 
and __6. Responsive design app form pulling data from a series of FHIR records e.g. retrieving and flattening the data, from a front-end design perspective.__

## Overview

![Product GIF](./github-assets/demo.gif)

The application, built using [React.js](https://github.com/facebook/react) and a range of "made-for-React" libraries
like [reactstrap](https://reactstrap.github.io/) and [react-charjs-2](https://jerairrest.github.io/react-chartjs-2/), is lightweight, 
responsive, and SPA-based. 

It comes with a seamless front-end for viewing the patient data, easy-to-use search options, and dynamic charts giving
statistical insight about the patient group.

### View (with built-in Raw FHIR Data Viewer) 

The patient list along with patient data can be seamlessly viewed in a responsive table format with easy-to-see cards containing 
common/important information (like Name, Age, Contact details, etc.) and a built-in Raw FHIR Data Viewer for a more detailed 
viewing experience.

### Search 

A simple, yet effective search option that can be used to filter out data by any attribute - be it name, age, gender, etc.

### Visualise

The application uses [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2) to generate dynamic visualisations of the patient 
data; providing statistical insight into the patients' age, gender, and city of origin. 

### Experience responsive data analysis

The web app is fully responsive - from the patient data viewing experience to the data visualisation - down to the very smallest detail; accomplished through [react-bootstrap's](https://react-bootstrap.github.io/) responsive components. This will make the process to migrating the application to a React Native application much easier, which can be targetted to native smartphones and tablets.

---

## Available scripts

To install dependancies

```cli
$ npm install
```


To run

```cli
$ npm start
```

To optimise build

```cli
$ npm build
```
