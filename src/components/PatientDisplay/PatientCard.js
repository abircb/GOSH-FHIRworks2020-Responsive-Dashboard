import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  Modal,
} from "reactstrap";
import React from "react";

class PatientCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
    this.toggleModalLarge = this.toggleModalLarge.bind(this);
  }

  toggleModalLarge() {
    this.setState({
      modalLarge: !this.state.modalLarge,
    });
  }

  render() {
    const { patient } = this.props;
    const codeStyle = {
      backgroundColor: "#000000",
      fontFamily: "courier, monospace",
      color: "#006400",
      padding: "0 3px",
    };

    return (
      <>
        <Card style={{ width: "20rem" }}>
          <CardBody>
            <CardTitle>{patient.name}</CardTitle>
            <CardSubtitle className="mb-2 text-muted">
              {patient.age} year old {patient.gender}
            </CardSubtitle>
            <CardText>
              Birth date: {patient.birthDate} <br></br>
              Marital Status: {patient.maritalStatus} <br></br>
            </CardText>
            <CardLink onClick={this.toggleModalLarge} className="text-success">
              View Raw FHIR Data
            </CardLink>
          </CardBody>
        </Card>

        <Modal isOpen={this.state.modalLarge} toggle={this.toggleModalLarge}>
          <div className="modal-header">
            <center>
              <h3 className="modal-title" id="exampleModalLongTitle">
                PatientID: {patient.id}
              </h3>
              <br></br>
            </center>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
              onClick={this.toggleModalLong}
            >
              <i className="tim-icons icon-simple-remove success" />
            </button>
          </div>
          <code style={codeStyle}>{JSON.stringify(patient.raw)}</code>
        </Modal>
      </>
    );
  }
}

export default PatientCard;
