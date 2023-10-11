import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useRef, useState, useEffect, Fragment } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
import { Link } from "react-router-dom";
import { FIRE_REPORT } from "../../pdf/fireReport.view";
import Loader from "../misc/Loader";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

const FireTableAntd = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const searchInput = useRef(null);
  const [fires, setFires] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //function to fetch fires from the database
    function fetchData() {
      axios
        .get(
          `${
            NODE_ENV === "production"
              ? REACT_APP_API_URL_PROD
              : REACT_APP_API_URL_DEV
          }/getFires`
        )
        .then(function (response) {
          const { data } = response;
          setFires(data);
          setTimeout(() => {
            setLoading(true);
          }, 1000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchData();
  }, []);
  //log data
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Caller Name",
      dataIndex: "callerName",
      key: "callerName",
      ...getColumnSearchProps("callerName"),
    },
    {
      title: "Location",
      dataIndex: "incidentAddress",
      key: "incidentAddress",
      ...getColumnSearchProps("incidentAddress"),
    },
    {
      title: "Platoon",
      dataIndex: "platoon",
      key: "platoon",
      ...getColumnSearchProps("platoon"),
    },
    {
      title: "Station Area",
      dataIndex: "stationArea",
      key: "stationArea",
      ...getColumnSearchProps("stationArea"),
    },
    {
      title: "Name of Owner",
      dataIndex: "nameOfOwner",
      key: "nameOfOwner",
      ...getColumnSearchProps("nameOfOwner"),
      sorter: (a, b) => a.nameOfOwner.length - b.nameOfOwner.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone Number of Owner",
      dataIndex: "telephoneNumberOfOwner",
      key: "telephoneNumberOfOwner",
      ...getColumnSearchProps("telephoneNumberOfOwner"),
    },
    {
      title: "Type Of Fire",
      dataIndex: "typeOfFire",
      key: "typeOfFire",
      ...getColumnSearchProps("typeOfFire"),
      sorter: (a, b) => a.typeOfFire.length - b.typeOfFire.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (fire) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Link to={"/editFire"} state={{ fire }}>
              <button className="m-1 btn-info">Edit</button>
            </Link>
            <button
              className="m-1 btn-dark"
              onClick={(e) => {
                setSelectedReport(fire);
                setShow(!show);
              }}
            >
              View
            </button>
          </div>
        );
      },
    },
  ];
  return loading ? (
    <Fragment className="frame">
      {show && <FIRE_REPORT report={selectedReport} />}
      <Table
        columns={columns}
        dataSource={fires}
        style={{
          padding: "0 20px",
        }}
      />
    </Fragment>
  ) : (
    <Loader percent={90} />
  );
};

export default FireTableAntd;
