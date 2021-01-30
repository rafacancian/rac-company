import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'handshake-o',
    title: 'Suppliers',
    subtitle: 'Supplier form system create to join all the exists contacts from the company'
}

const baseUrl = 'http://localhost:3001/suppliers'
const initialState = {
    supplier: { name: '', email: '', cnpj: '', phone: '', address: '' },
    list: []
}

export default class SupplierCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ suppliers: initialState.supplier })
    }

    save() {
        const supplier = this.state.supplier
        const method = supplier.id ? 'put' : 'post'
        const url = supplier.id ? `${baseUrl}/${supplier.id}` : baseUrl
        axios[method](url, supplier)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ supplier: initialState.supplier, list })
            })
    }

    getUpdatedList(supplier, add = true) {
        const list = this.state.list.filter(u => u.id !== supplier.id)
        if(add) list.unshift(supplier)
        return list
    }

    updateField(event) {
        const supplier = { ...this.state.supplier }
        supplier[event.target.name] = event.target.value
        this.setState({ supplier })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome:</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.supplier.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digit the name..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.supplier.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digit the e-mail..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>CNPJ:</label>
                            <input type="text" className="form-control"
                                name="cpnf"
                                value={this.state.supplier.cnpj}
                                onChange={e => this.updateField(e)}
                                placeholder="Digit the document..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label>Phone number:</label>
                            <input type="text" className="form-control"
                                name="phone"
                                value={this.state.supplier.phone}
                                onChange={e => this.updateField(e)}
                                placeholder="Digit the phone..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Address:</label>
                            <input type="text" className="form-control"
                                name="address"
                                value={this.state.supplier.address}
                                onChange={e => this.updateField(e)}
                                placeholder="Digit the address..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Save
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(supplier) {
        this.setState({ supplier })
    }

    remove(supplier) {
        axios.delete(`${baseUrl}/${supplier.id}`).then(resp => {
            const list = this.getUpdatedList(supplier, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>CNPJ</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(supplier => {
            return (
                <tr key={supplier.id}>
                    <td>{supplier.id}</td>
                    <td>{supplier.name}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.cnpj}</td>
                    <td>{supplier.phone}</td>
                    <td>{supplier.address}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(supplier)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(supplier)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}