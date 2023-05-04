import React from "react";
import DreveskoCard from "./DreveskoCard";

const DreveskoList = ({title}) => {
    return (
        <div style={styles.container}>
            <h4>{title}</h4>
            <DreveskoCard/>
        </div>
    )
};

const styles = {
    container: {
        backgroundColor: "#ccc",
        borderRadius: 3,
        width: 300,
        padding: 8
    }
}

export default DreveskoList;