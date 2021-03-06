
import React, { useState, useEffect } from "react";
import { Jumbotron, Button, Input, InputGroup, InputGroupAddon, Container, Row, Col } from 'reactstrap';
import axios from 'axios'

const Rappel = (props) => {



	const [newRappel, setNewRappel] = useState(null)
	const [rappels, setRappels] = useState([])
	const [rappelsTermines, setRappelsTermines] = useState([])


	const getRappels = () => {
		axios.get('http://localhost:3100/rappel').then(res => {
			setRappels(res.data.filter(rappel => rappel.finished == false))
			setRappelsTermines(res.data.filter(rappel => rappel.finished == true))
		})
	}
	useEffect(() => {
		getRappels()
	}, [])
	const ajouterRappel = () => {
		// fonction pour ajouter un rappel à la liste des rappels
		axios.post('http://localhost:3100/rappel', { text: newRappel }).then(res => {
			getRappels()
		})

	}

	const supprimerRappel = (id) => {
		axios.delete('http://localhost:3100/rappel/' + id).then(res => {
			getRappels()
		})
	}


	const handleCheck = (checked, index, id) => {
		axios.put('http://localhost:3100/rappel/' + id, { finished: true }).then(res => {
			getRappels()
		})

	}

	return (
		<div>
			<Jumbotron>
				<div style={{ textAlign: "center" }}>
					<h1 className="display-4">Widget Rappel</h1>
					<p className="lead">Créer des rappels</p>
				</div>

				<InputGroup>
					<Input type="text" placeholder="Ajouter un rappel" onChange={e => setNewRappel(e.target.value)} value={newRappel} />
					<InputGroupAddon addonType="append">
						<Button color="info" onClick={ajouterRappel}> Ajouter </Button>
					</InputGroupAddon>
				</InputGroup>

				<hr></hr>
				<Container>
					<Row>
						<Col sm="6">
							<h2 style={{ marginTop: "15px", marginBottom: "30px" }}> <span style={{ border: "thick double red", padding: "5px" }}>Rappels</span> </h2>
							{rappels.map((rappel, index) => (
								<div key={'rappel' + index}>
									<Input type="checkbox" onChange={e => handleCheck(e.target.checked, index, rappel._id)} /> <span style={{ fontSize: "20px" }}>{rappel.text}</span>
								</div>

							))}
						</Col>
						<Col sm="6">
							<h2 style={{ marginTop: "15px", marginBottom: "30px" }}> <span style={{ border: "thick double green", padding: "5px" }}>Terminés</span> </h2>
							{rappelsTermines.map((rappel, index) => (
								<div key={'rappelTermines' + index}>
									<span style={{ textDecoration: "line-through", fontSize: "20px", marginRight: "10px" }}>{rappel.text}</span>
									<Button color="danger" onClick={() => supprimerRappel(rappel._id)}>Supprimer</Button>
								</div>
							))}
						</Col>
					</Row>
				</Container>

			</Jumbotron>
		</div>
	)
}


export default Rappel