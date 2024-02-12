import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const StatsChart = (props) => {
    const [chart, setChart] = useState([]);
    const STATSURL = "https://pokeapi.co/api/v2/pokemon/";

    // ottengo il valore di una proprietà css
    function cssvar(name) {
        return getComputedStyle(document.body).getPropertyValue(name);
    }

    useEffect(()=> {

        const fetchStats = async () => {
            await fetch(STATSURL + props.pkmnname)
            .then((response) => {
                response.json()
                .then((json)=> {
                    setChart(json.stats);
                })
            }).catch(error => {
                console.log(error)
            });
        }
        fetchStats();
    }, []);

    let data = {
        labels: chart.map(x => x.stat.name),
        datasets: [
            {
                label: "Statistica base",
                data: chart.map(y => y.base_stat),
                backgroundColor: cssvar("--primary-pkmn-color")
            },
        ],
    }
    let options = {
        responsive: true
    }

    return (
        <Bar
            data = {data}
            options = {options}
        />
    )
}

export default StatsChart