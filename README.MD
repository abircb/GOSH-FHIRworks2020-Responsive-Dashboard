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

For my solution, I chose a combination of two themes - __2. Graphing data from FHIR records__ 
and __6. Responsive design app form pulling data from a series of FHIR records e.g. retrieving and flattening the data, from a front-end design perspective__ - from the large range of themes provided to us.

## Overview

![Product GIF](./github-assets/demo.gif)

This application - built using [React.js](https://github.com/facebook/react), [react-router](https://reacttraining.com/react-router/), [reactstrap](https://reactstrap.github.io/), and [react-chartjs-2](https://jerairrest.github.io/react-chartjs-2/) - visualises synthetically generated FHIR data from the [GOSH Drive Azure API](https://github.com/goshdrive/FHIRworks_2020) and creates a seamless analytical experience.

#### View __(with built-in Raw FHIR Data Viewer) __

Patient data can be effortlessly viewed in a responsive table format with aesthetically pleasing cards containing important information (like name, age, contact details, etc.) about a patient, and a built-in ``Raw FHIR Data Viewer`` for more detailed analysis.

#### Search 

A simple, yet effective search option that can be used to filter out patients by any attribute - be it name, age, gender, etc.

#### Visualise

The application uses [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2) to generate dynamic visualisations of the patient 
data; providing statistical insight about the patient group's age, gender, and city of origin. 

#### Experience responsive data analysis

The web app is fully responsive - from the data viewing experience to the data visualisation - down to the very smallest detail; accomplished through [react-bootstrap's](https://react-bootstrap.github.io/) responsive components. This will also make the process to migrating the application to a React Native application much easier, which can be targetted to native smartphones and tablets.

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
