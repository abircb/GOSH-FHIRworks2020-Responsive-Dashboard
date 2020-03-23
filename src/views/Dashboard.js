import React from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { requestPatientList, parseAllPatientData } from "../api/data";
import {
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Overlay from "../components/Overlay/Overlay";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import PatientCard from "../components/PatientDisplay/PatientCard";
import ChartCard from "../components/Charts/ChartCard";

const { SearchBar } = Search;

const findAttribute = (data, key) => {
  const occurrences = data.reduce(function (sums, entry) {
    sums[entry[key]] = (sums[entry[key]] || 0) + 1;
    return sums;
  }, {});
  return occurrences;
};

const getAgeDistribution = (data, key) => {
  const distribution = data.reduce(function (sums, entry) {
    const age = entry[key];
    const ageRange = age - (age % 10);
    sums[ageRange] = (sums[ageRange] || 0) + 1;
    return sums;
  }, {});
  return distribution;
};

const sortByObjectValue = (ageDistribution) => {
  var sortable = [];
  for (var age in ageDistribution) {
    sortable.push([age, ageDistribution[age]]);
  }

  sortable.sort(function (a, b) {
    return a[1] - b[1];
  });

  var sortedObject = {};
  sortable.forEach(function (item) {
    sortedObject[item[0]] = item[1];
  });
  return sortedObject;
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: null,
      tableAttributes: [
        {
          dataField: "id",
          text: "ID",
        },
        {
          dataField: "name",
          text: "Name",
        },
        {
          dataField: "age",
          text: "Age",
        },
        {
          dataField: "gender",
          text: "Sex",
        },
        {
          dataField: "address",
          text: "Address",
        },
        {
          dataField: "phone",
          text: "Contact",
        },
      ],
      defaultSorted: [
        {
          dataField: "name",
          order: "asc",
        },
      ],
      tableOptions: {
        sizePerPage: 12,
        hideSizePerPage: true,
        hidePageListOnlyOnePage: true,
      },
    };
  }
  async componentDidMount() {
    let json = await requestPatientList();
    json = parseAllPatientData(json);
    let size = Object.entries(json).length;
    this.setState({
      patients: json,
      tableSize: size,
    });
    console.log(json);
  }

  expandRow = {
    showExpandColumn: true,
    renderer: (row) => (
      <PatientCard patient={this.findPatient(row.id)}></PatientCard>
    ),
  };

  /*
  <ReactJson src={this.findPatient(row.id)} theme={"shapeshifter:inverted"}>
  </ReactJson>
  */

  findPatient = (id) => {
    for (var index in this.state.patients) {
      if (this.state.patients[index]["id"] === id) {
        return this.state.patients[index];
      }
    }
  };

  GenderDistribution = () => {
    const occ = findAttribute(this.state.patients, "gender");
    let chartDetails = {
      data: (canvas) => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)");
        let lightweight = "#41c4ac";

        return {
          labels: Object.keys(occ),
          datasets: [
            {
              data: Object.values(occ),
              fill: true,
              backgroundColor: [gradientStroke, lightweight],
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
            },
          ],
        };
      },
    };

    return <Doughnut data={chartDetails.data} />;
  };

  OriginDistribution = () => {
    let distribution = sortByObjectValue(
      findAttribute(this.state.patients, "city")
    );
    distribution = Object.fromEntries(
      Object.entries(distribution).slice(Object.keys(distribution).length - 7)
    );
    let chartDetails = {
      data: (canvas) => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)");
        let lightweight = "#41c4ac";

        return {
          labels: Object.keys(distribution),
          datasets: [
            {
              data: Object.values(distribution),
              fill: true,
              backgroundColor: [
                gradientStroke,
                lightweight,
                "#0074D9",
                "#FF4136",
                "#FFDC00",
                "#FF851B",
                "#001f3f",
              ],
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
            },
          ],
        };
      },
    };

    return <Pie data={chartDetails.data} />;
  };

  AgeDistribution = () => {
    const distribution = sortByObjectValue(
      getAgeDistribution(this.state.patients, "age"),
      10,
      true
    );
    let chartDetails = {
      data: (canvas) => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
        gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
        gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
        gradientStroke.addColorStop(0, "rgba(119,52,169,0)");

        return {
          labels: Object.keys(distribution),
          datasets: [
            {
              label: "Number",
              fill: true,
              backgroundColor: gradientStroke,
              hoverBackgroundColor: gradientStroke,
              borderColor: "#d048b6",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: Object.values(distribution),
            },
          ],
        };
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: "#f5f5f5",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                suggestedMin: 60,
                suggestedMax: 120,
                padding: 20,
                fontColor: "#9e9e9e",
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
                color: "rgba(225,78,202,0.1)",
                zeroLineColor: "transparent",
              },
              ticks: {
                padding: 20,
                fontColor: "#9e9e9e",
              },
            },
          ],
        },
      },
    };
    return <Bar data={chartDetails.data} options={chartDetails.options} />;
  };

  render() {
    return (
      <div className="content">
        <Overlay show={!this.state.patients}></Overlay>
        {this.state.patients ? (
          <div>
            <Row>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Gender Distribution</h5>
                    <CardTitle tag="h5">
                      <i className="tim-icons icon-bulb-63 text-info" /> The
                      male : female ratio visualised
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <ChartCard
                      children={this.GenderDistribution()}
                      title="Gender Distribution"
                    ></ChartCard>
                  </CardBody>
                  <br></br>
                  <CardTitle tag="h5">
                    <br></br>
                    <br></br>
                  </CardTitle>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Age Distribution</h5>
                    <CardTitle tag="h5">
                      <i className="tim-icons icon-bulb-63 text-info" />{" "}
                      Quantitative visualisation of how the patient group is
                      divided by age
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <ChartCard
                      children={this.AgeDistribution()}
                      title="Age Distribution"
                    ></ChartCard>
                  </CardBody>
                  <CardTitle tag="h5">
                    <br></br>
                    <br></br>
                  </CardTitle>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="card-category">Most Popular Cities</h5>
                    <CardTitle tag="h5">
                      <i className="tim-icons icon-bulb-63 text-info" /> Top 7
                      Cities of the patient group
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <ChartCard
                      children={this.OriginDistribution()}
                      title="Age Distribution"
                    ></ChartCard>
                  </CardBody>
                  <CardTitle tag="h5">
                    <i className="tim-icons icon-pin text-info" /> Dashboard
                    Hack: Click on a legend icon to remove that value from the
                    chart
                    <br></br>
                  </CardTitle>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg="12" md="12">
                <Card>
                  <CardHeader>
                    <center>
                      <CardTitle tag="h2">Patient Data</CardTitle>
                    </center>
                  </CardHeader>
                  <ToolkitProvider
                    keyField="id"
                    data={this.state.patients}
                    columns={this.state.tableAttributes}
                    search
                  >
                    {(props) => (
                      <div>
                        <center>
                          <SearchBar {...props.searchProps} />
                        </center>
                        <hr />
                        <BootstrapTable
                          keyField="id"
                          bordered={false}
                          defaultSorted={this.state.defaultSorted}
                          pagination={paginationFactory(
                            this.state.tableOptions
                          )}
                          expandRow={this.expandRow}
                          {...props.baseProps}
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <Alert
              color="success"
              className="alert-with-icon"
              isOpen={this.state.visible}
              toggle={this.onDismiss}
            >
              <span
                data-notify="icon"
                className="tim-icons icon-refresh-02"
              ></span>
              <span data-notify="message">
                Please wait, fetching data from the server. This might be a good
                time to wash your hands.{" "}
                <a
                  href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                  className="text-info"
                >
                  COVID-19
                </a>{" "}
                is now a global pandemic.
              </span>
            </Alert>
          </div>
        )}
      </div>
    );
  }
}
export default Dashboard;
