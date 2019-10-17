import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

function App() {
  const budget = 10000;
  const [data, setData] = useState([
    { data1: "Cost Center", data2: 10, data3: "some data" },
    { data1: "Another one", data2: 20, data3: "some data" },
    { data1: "Another CC", data2: 30, data3: "some data" }
  ]);
  const [form, setForm] = useState({ data1: "", data2: 0, data3: "" });
  const [costCenter, setCostCenter] = useState("");
  const generate = () => {
    const costCenters = costCenter.split(",");

    const moreData = costCenters.map(cc => ({ ...form, data1: cc }));

    setData([...data, ...moreData]);
  };

  const handleChange = (index, change) => {
    const record = { ...data[index], ...change };
    const newData = [...data];

    newData[index] = record;

    setData(newData);
  };

  const percentage = data.reduce((a, b) => a + (b["data2"] || 0), 0);
  return (
    <Container>
      <DataEdit>
        <Data>
          <Typography>Some Line Item</Typography>
          <Typography>Value: ${budget}</Typography>
          <Typography>Current Percentage: {percentage}%</Typography>
          {percentage > 100 && (
            <Typography>
              You are {percentage - 100}% over value or {" $"}
              {budget * (percentage / 100) - budget}.
            </Typography>
          )}
        </Data>
        <Edit>
          <TextField
            label="Cost Center"
            name="costCenter"
            value={costCenter}
            onChange={e => setCostCenter(e.target.value)}
          />
          <TextField
            label="data2"
            name="data2"
            type="number"
            value={form.email}
            onChange={e =>
              setForm({
                ...form,
                [e.target.name]: parseInt(e.target.value)
              })
            }
          />
          <TextField
            label="data3"
            name="data3"
            value={form.nickname}
            onChange={e =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => generate()}
            disabled={!form.data2 || !form.data3 || !costCenter}
          >
            Generate
          </Button>
        </Edit>
      </DataEdit>
      <Table>
        <RowContainer>
          <Typography>
            <strong>Cost Center</strong>
          </Typography>
          <Typography>
            <strong>Other Data</strong>
          </Typography>
          <Typography>
            <strong>Other Data</strong>
          </Typography>
        </RowContainer>
        {data.map((d, index) => (
          <Row key={index} index={index} {...d} onChange={handleChange} />
        ))}
      </Table>
    </Container>
  );
}

export default App;

const Row = ({ data1, data2, data3, onChange, index }) => {
  const [edit, setEdit] = useState(false);

  if (edit) {
    return (
      <RowContainer>
        <TextField
          label="data1"
          name="data1"
          value={data1}
          onChange={e => onChange(index, { [e.target.name]: e.target.value })}
        />
        <TextField
          label="data2"
          name="data2"
          type="number"
          value={data2}
          onChange={e =>
            onChange(index, { [e.target.name]: parseInt(e.target.value) })
          }
        />
        <TextField
          label="data3"
          name="data3"
          value={data3}
          onChange={e => onChange(index, { [e.target.name]: e.target.value })}
        />
        <Button onClick={() => setEdit(false)}>Save</Button>
      </RowContainer>
    );
  }

  return (
    <RowContainer>
      <Typography>
        <a onClick={() => setEdit(true)}>{data1}</a>
      </Typography>
      <Typography>
        <a onClick={() => setEdit(true)}>{data2}</a>
      </Typography>
      <Typography>
        <a onClick={() => setEdit(true)}>{data3}</a>
      </Typography>
    </RowContainer>
  );
};

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border-bottom: solid 1px lightgrey;
  align-items: center;
  padding: 0.2em;
`;

const Table = styled(Paper)`
  display: grid;
  width: 500px;
  height: fit-content;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1em;
  width: 100%;
  padding: 2em;
  background-color: aliceblue;
  height: 100vh;
  overflow-y: scroll;
`;

const Edit = styled(Paper)`
  padding: 1em;
  width: 500px;
  display: grid;
  grid-gap: 1em;
  height: fit-content;
`;

const Data = styled(Paper)`
  padding: 1em;
  display: grid;
  grid-gap: 1em;
  max-height: 300px;
  height: fit-content;
  text-align: left;
`;

const DataEdit = styled.div`
  display: grid;
  grid-gap: 1em;
  height: fit-content;
`;
