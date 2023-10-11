import { useState } from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  PDFViewer,
  View,
  Image,
} from "@react-pdf/renderer";
import { Modal, Col, Row } from "antd";
import { formatDate } from "../helpers/components/functions/formatDate";
import windhoekLogo from "../assets/windhoekLogo.png";
import fireBrigadeLogo from "../assets/fireDepartmentLogo.png";

export const FIRE_REPORT = ({ report }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page style={styles.body}>
        <Row style={styles.formTitleContainer}>
          <View style={styles.fireBrigadeLogo}>
            <Image src={fireBrigadeLogo} alt="fire brigade logo" />
          </View>
          <View style={styles.windhoekLogo}>
            <Image src={windhoekLogo} alt="municipality of windhoek logo" />
          </View>

          <Col span={24} style={styles.headerContainer}>
            <Text style={styles.headerPrimaryText}>
              Windhoek Emergency Management
            </Text>
            <Text style={styles.headerTitleText}>Fire Report</Text>
          </Col>
        </Row>
        <View style={styles.formContainer}>
          <Row style={styles.formTextContainer}>
            <Col span={6} style={styles.textBox}>
              <Text style={styles.formTextHeader}>Call number</Text>
              <Text style={styles.formText}>{report.callNumber  || "N/A"}</Text>
            </Col>
            <Col span={6} style={styles.textBox}>
              <Text style={styles.formTextHeader}>Platoon</Text>
              <Text style={styles.formText}>{report.platoon  || "N/A"}</Text>
            </Col>
            <Col span={6} style={styles.textBox}>
              <Text style={styles.formTextHeader}>Date</Text>
              <Text style={styles.formText}>
                {formatDate(report.dateOfReport)  || "N/A"}
              </Text>
            </Col>
            <Col span={6} style={styles.textBox}>
              <Text style={styles.formTextHeader}>Station area</Text>
              <Text style={styles.formText}>{report.stationArea || "N/A"}</Text>
            </Col>
          </Row>
          <Row style={styles.formTextContainer}>
            <Col span={6} style={styles.textBox}>
              <Text style={styles.formTextHeader}>Device used</Text>
              <Text style={styles.formText}>{report.methodOfReporting || "N/A"}</Text>
            </Col>
            <Col span={6} style={styles.textBox}>
              <Text style={styles.formTextHeader}>Phonenumber</Text>
              <Text style={styles.formText}>{report.telephoneNumber || "N/A"}</Text>
            </Col>
            <Col span={6} style={styles.textBox}>
              <Text style={styles.formTextHeader}>Caller location</Text>
              <Text style={styles.formText}>{report.locationOfCaller || "N/A"}</Text>
            </Col>
            <Col span={6} style={styles.textBox}>
              <Text style={styles.formTextHeader}>Caller name</Text>
              <Text style={styles.formText}>{report.callerName || "N/A"}</Text>
            </Col>
          </Row>
          <Row style={styles.formTextContainer}>
            <Col span={24} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Incident address</Text>
              <Text style={styles.formText}>{report.incidentAddress || "N/A"}</Text>
            </Col>
          </Row>
          <Row style={styles.formTextContainer}>
            <Col span={4} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Called</Text>
              <Text style={styles.formText}>{report.timeCalled || "N/A"}</Text>
            </Col>
            <Col span={4} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Dispatched</Text>
              <Text style={styles.formText}>{report.timeDispatched || "N/A"}</Text>
            </Col>
            <Col span={8} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Arrival</Text>
              <Text style={styles.formText}>{report.timeOfArrival || "N/A"}</Text>
            </Col>
            <Col span={4} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Time in</Text>
              <Text style={styles.formText}>{report.timeIn || "N/A"}</Text>
            </Col>
            <Col span={4} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Duration</Text>
              <Text style={styles.formText}>{report.totalTimeOut || "N/A"}</Text>
            </Col>
          </Row>

          <Row style={styles.spaceBetween}></Row>

          <Row style={styles.formTextContainer}>
            <Col span={24} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Type of fire</Text>
              <Text style={styles.formText}>{report.typeOfFire || "N/A"}</Text>
            </Col>
          </Row>

          <Row style={styles.formTextContainer}>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Other types</Text>
              <Text style={styles.formText}>{report.otherTypes || "N/A"}</Text>
            </Col>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Vehicle</Text>
              <Text style={styles.formText}>{report.typeOfVehicle || "N/A"}</Text>
            </Col>
          </Row>

          <Row style={styles.spaceBetween}></Row>

          <Row style={styles.formTextContainer}>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Owner name</Text>
              <Text style={styles.formText}>{report.nameOfOwner || "N/A"}</Text>
            </Col>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Owner number</Text>
              <Text style={styles.formText}>
                {report.telephoneNumberOfOwner|| "N/A"}
              </Text>
            </Col>
          </Row>
          <Row style={styles.formTextContainer}>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>ID number</Text>
              <Text style={styles.formText}>{report.identificationNumber || "N/A"}</Text>
            </Col>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Owner number</Text>
              <Text style={styles.formText}>
                {report.telephoneNumberOfOwner}
              </Text>
            </Col>
          </Row>
          <Row style={styles.formTextContainer}>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Postal address</Text>
              <Text style={styles.formText}>{report.postalAddress || "N/A"}</Text>
            </Col>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Device used</Text>
              <Text style={styles.formText}>
                {report.cellphoneNumber || "N/A"}
              </Text>
            </Col>
          </Row>
          <Row style={styles.formTextContainer}>
            <Col span={8} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Street name & number</Text>
              <Text style={styles.formText}>
                {report.residentialAddress.streetName || "N/A"}{" "}
                {report.residentialAddress.streetNumber || "N/A"}
              </Text>
            </Col>
            <Col span={8} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Suburb</Text>
              <Text style={styles.formText}>
                {report.residentialAddress.suburb || "N/A"}
              </Text>
            </Col>
            <Col span={8} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Erf</Text>
              <Text style={styles.formText}>
                {report.residentialAddress.erfNumber || "N/A"}
              </Text>
            </Col>
          </Row>

          <Row style={styles.spaceBetween}></Row>

          <Row style={styles.formTextContainer}>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Other</Text>
              <Text style={styles.formText}>{report.other || "N/A"}</Text>
            </Col>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Fire Origin</Text>
              <Text style={styles.formText}>{report.originOfFire || "N/A"}</Text>
            </Col>
          </Row>
          <Row style={styles.formTextContainer}>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Extinguishment method</Text>
              <Text style={styles.formText}>
                {report.methodOfExtinguishing || "N/A"}
              </Text>
            </Col>
            <Col span={12} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Quantity used</Text>
              <Text style={styles.formText}>{report.quantity || "N/A"}</Text>
            </Col>
          </Row>
          <Row style={styles.formTextContainer}>
            <Col span={24} style={styles.textBox}>
            <Text style={styles.formTextHeader}>Incident summary</Text>
              <Text style={styles.formText}>{report.summaryOfIncident || "N/A"}</Text>
            </Col>
          </Row>
        </View>
      </Page>
    </Document>
  );

  return (
    <Modal
      title="Fire Report"
      visible={isModalOpen}
      onOk={handleOk}
      centered
      onCancel={handleCancel}
      width={1000}
    >
      <PDFViewer style={styles.pdfViewer}>
        <MyDocument />
      </PDFViewer>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pdfViewer: {
    width: "100%",
    height: "80vh",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formContainer: {
    marginTop: 70,
  },
  fireBrigadeLogo: {
    width: 100,
    height: 100,
    left: 300,
    position: "absolute",
  },
  windhoekLogo: {
    width: 100,
    height: 100,
    right: 300,
    position: "absolute",
  },
  spaceBetween: {
    // height: 20,
  },
  formText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  formTextHeader: {
    fontSize: 14,
    textAlign: "start",
    fontWeight: "bold",
  },
  textBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    padding: 2,
    width: "100%",
    margin: "1%",
  },
  body: {
    paddingTop: 5,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  formTextContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formTitleContainer: {
    margin: "0 auto ",
  },
  headerView: {
    marginTop: 15,
    paddingBottom: -20,
  },
  municipalityText: {
    textAlign: "center",
    paddingTop: 20,
  },
  headerBlock: {
    backgroundColor: "#fcc303",
    textAlign: "center",
    height: 30,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    marginBottom: 18,
    marginTop: 18,
  },

  headerTitleText: {
    marginTop: 8,
    fontSize: 30,
  },
  miniTableRowTop: {
    textAlign: "center",
    height: 28,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    border: "1 solid #000",
  },
  miniTableRowMiddle: {
    textAlign: "center",
    height: 35,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    border: "1 solid #000",
  },
  miniTableRowBottom: {
    textAlign: "center",
    height: 28,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    border: "1 solid #000",
  },
  declarationText: {
    fontSize: 9,
    textAlign: "center",
  },
  declarationTextColumn: {
    display: "flex",
    flex: "0 0 auto",
    color: "black",
  },
  referenceText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 8,
    marginTop: 8,
  },
  referenceTitleText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 10,
    marginTop: 8,
  },
  //table
  table: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    overflow: "none",
  },
  firstColumn: {
    display: "flex",
    flex: "0 0 auto",
    color: "black",
    fontSize: 11,
    width: "50%",
  },
  secondColumn: {
    display: "flex",
    flex: "0 0 auto",
    color: "#5e6163",
    fontSize: 11,
    width: "50%",
  },
  logoTableColumn: {
    display: "flex",
    flex: "0 0 auto",
    fontSize: 11,
    width: "25%",
    right: 196,
    bottom: 30,
  },
  logoTableColumn1: {
    display: "flex",
    flex: "0 0 auto",
    fontSize: 11,
    width: "25%",
  },
  titleTableColumn: {
    display: "flex",
    flex: "0 0 auto",
    color: "black",
    fontSize: 11,
    width: "50%",
  },
  titleTableColumnBottom: {
    display: "flex",
    flex: "0 0 auto",
    color: "black",
    fontSize: 11,
    width: "50%",
    bottom: 65,
  },
  referenceTableColumn: {
    display: "flex",
    flex: "0 0 auto",
    color: "black",
    fontSize: 11,
    width: "25%",
  },
  leftTitleBlock: {
    display: "flex",
    flex: "0 0 auto",
    color: "black",
    fontSize: 11,
    width: "70%",
  },

  rightTitleBlock: {
    display: "flex",
    flex: "0 0 auto",
    color: "black",
    fontSize: 11,
    width: "30%",
  },
  commentsLeftBlock: {
    display: "flex",
    flex: "0 0 auto",
    color: "black",
    fontSize: 11,
    width: "60%",
  },
  planRightBlock: {
    display: "flex",
    flex: "0 0 auto",
    color: "black",
    fontSize: 11,
    width: "40%",
  },
});
