import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Modal } from "antd";
import { useRef, useState, useEffect, Fragment } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
import Loader from "../misc/Loader";

const { REACT_APP_API_URL_PROD, REACT_APP_API_URL_DEV, NODE_ENV } = process.env;

const ReportsTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const searchInput = useRef(null);
  const [reports, setReports] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function fetchData() {
    axios
      .get(
        `${
          NODE_ENV === "production"
            ? REACT_APP_API_URL_PROD
            : REACT_APP_API_URL_DEV
        }/reports`
      )
      .then(function (response) {
        const { data } = response;
        setReports(data);
        setTimeout(() => {
          setLoading(true);
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    //function to fetch fires from the database
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

  const handleOk = () => {
    axios
      .post(
        `${
          NODE_ENV === "production"
            ? REACT_APP_API_URL_PROD
            : REACT_APP_API_URL_DEV
        }/extinguishFire`,
        selectedReport
      )
      .then((res) => {
        fetchData();
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setShow(false);
  };

  // function to format the date and time
  const formatDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const year = newDate.getFullYear();
    const hours = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds() < 10 ? `0${newDate.getSeconds()}` : newDate.getSeconds();
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div
        style={{
          padding: 8
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
            display: "block"
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false
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
          color: filtered ? "#1890ff" : undefined
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
            padding: 0
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      )
  });

  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
      ...getColumnSearchProps("firstname")
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
      ...getColumnSearchProps("lastname")
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      ...getColumnSearchProps("location")
    },
    {
      title: "Phonenumber",
      dataIndex: "phonenumber",
      key: "phonenumber",
      ...getColumnSearchProps("phonenumber")
    },
    {
      title: "fireStatus",
      dataIndex: "fireStatus",
      key: "fireStatus",
      ...getColumnSearchProps("fireStatus"),
      sorter: (a, b) => a.fireStatus.length - b.fireStatus.length,
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Date Reported",
      dataIndex: "createdAt",
      key: "createdAt",
      ...getColumnSearchProps("createdAt"),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ["descend", "ascend"], 
      render: (text) => formatDate(text)
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (fire) => {
        return (
          <Fragment>
            <button
              className={`m-1 btn-${
                fire.fireStatus === "EXTINGUISHED" ? "success" : "danger"
              }`}
              disabled={fire.fireStatus === "EXTINGUISHED"}
              onClick={(e) => {
                setSelectedReport(fire);
                setShow(!show);
              }}
            >
              {fire.fireStatus === "EXTINGUISHED"
                ? "Extinguised"
                : "Extinguish"}
            </button>
          </Fragment>
        );
      }
    }
  ];
  return loading ? (
    <Fragment className="frame">
      <Modal
        title="Confirmation"
        visible={show}
        onOk={handleOk}
        centered
        okText="Yes"
        cancelText="No"
        okType="danger"
        onCancel={handleCancel}
      >
        Is the fire extinguished?
      </Modal>
      ;
      <Table
        columns={columns}
        dataSource={reports}
        style={{
          padding: "0 20px"
        }}
      />
    </Fragment>
  ) : (
    <Loader percent={90} />
  );
};

export default ReportsTable;
