import React from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <Nav>
            <NavItem>
              <NavLink href="https://www.hl7.org/fhir/overview.html">
                Abour FHIR
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.gosh.org/">GOSH</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.nhs.uk/">NHS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/goshdrive/FHIRworks_2020">
                FHIR Azure API
              </NavLink>
            </NavItem>
          </Nav>
          <div className="copyright">
            Using HL7 FHIR Standards, UCL CS COMP0016 Project for GOSH DRIVE and
            NHS England
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
