import React from "react";

import { WidgetGrid } from "../../../common/widgets/components";
import { BigBreadcrumbs } from "../../../common/navigation";
import {JarvisWidget} from "../../../common";
import Datatable from "../../../common/tables/components/Datatable";
import { connect } from 'react-redux'
import { empGetEvent,empAddEvent,empGetIdEvent } from "../../../common/employee/employeeAction.js";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { Modal,ModalHeader,ModalBody,ModalFooter,Button } from "react-bootstrap";


class EmployeeList extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.toggleDanger = this.toggleDanger.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.submitemployeeRegistrationForm = this.submitemployeeRegistrationForm.bind(this);
    
        this.state = {
            fields : {},
            error : {},
            employeedata : [],
            danger: false,
            modalEdit: false
        }    
    }

    componentWillMount() {
        //alert("componentWillMount")
        console.log("componentWillMount==>") 
        console.log(this.props.employee) 
    }
    
    componentDidMount() {
        // alert("componentDidMount")
        this.props.empGetEvent()  //Function use to dispatch action
        // console.log("compontes Didmount:")      
        // console.log(this.props.employee); 
    }

    componentDiUpdate(){
        // alert("componentDiUpdate")
        // console.log("componentDiUpdate==>")
        // console.log(this.props.employee)
    }

    UNSAFE_componentWillUpdate(){
        // alert("UNSAFE_componentWillUpdate")        
        // console.log("UNSAFE_componentWillUpdate==>")
        // console.log(this.props.employee)
    }

    UNSAFE_componentWillReceiveProps(){
        // alert("UNSAFE_componentWillReceiveProps")
        // console.log("UNSAFE_componentWillReceiveProps==>")
        // console.log(this.props.employee)                
    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({fields});
    }

    toggleEdit() {
        this.setState({
            modalEdit: !this.state.modalEdit
        });
    }

    toggleDanger() {
        this.setState({
            danger: !this.state.danger
        });
    }

    handleDeleteClick = () => {
        console.log("Delete Button Clicked");
    }

    actionButton(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <button type="button" onClick={() => this.onClickEditSelected(cell, row, rowIndex)}>Edit { row.id }</button>
                &nbsp;&nbsp;
                <button type="button" onClick={() => this.onClickDeleteSelected(cell, row, rowIndex)}>Delete { row.id }</button>
            </div>
        )
    }

    onClickEditSelected(cell, row, rowIndex){
        console.log('Edit #', row.id);
        this.toggleEdit();
    }
    
    onClickDeleteSelected(cell, row, rowIndex){
        console.log('Delete #', row.id);
    }
    
    async submitemployeeRegistrationForm(e) {
        e.preventDefault();
        await this.props.empAddEvent(this.state.fields)
        //alert("form submited");
        //console.log(this.state.fields);
        // if (this.validateForm()) {
        //     let fields = {};
        //     fields["username"] = "";
        //     fields["emailid"] = "";
        //     fields["mobileno"] = "";
        //     fields["password"] = "";
        //     this.setState({fields:fields});
        //     alert("Form submitted");
        // }    
    }

    render() {
        
        const selectRowProp = {
			mode: 'checkbox',
			clickToSelect: true,
			bgColor: 'lightgrey'
		};
        
        const options = {
			sizePerPageList: [{
				text: '5', value: 5
			}, {
				text: '10', value: 10
			}, {
				text: '25', value: 25
			}, {
				text: '50', value: 50
			}, {
				text: '100', value: 100
			}, {
				text: 'All', value: 100
			}],
			sizePerPage: 10,
			page: 1,
			sortName: 'id',
			sortOrder: 'desc',
			prePage: 'Prev',
			nextPage: 'Next',
			firstPage: 'First',
			lastPage: 'Last',
			paginationPosition: 'both',
			paginationShowsTotal: this.renderShowsTotal
        };

        //console.log("Render:");
        //console.log(this.props.employee);

        return (
            <div id="content" className="">
                <div className="row">
                    <BigBreadcrumbs
                        items={["Employee", "Employee List"]}
                        className="col-xs-12 col-sm-7 col-md-7 col-lg-4"
                    />       
                    <button className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Add New Employee</button>
                    <button className="btn btn-primary btn-lg" onClick={this.toggleEdit} data-toggle="modal">edit New Employee</button>
                </div>

                <WidgetGrid>
                    <div className="row">
                        <article className="col-sm-12">
                            <JarvisWidget id="wid-id-0" editbutton={false} color="darken">
                                <header>
                                    <span className="widget-icon">
                                        <i className="fa fa-table" />
                                    </span>
                                    <h2 className="test">Employee List Redux</h2>
                                </header>
                                <div>
                                    <div className="widget-body">
                                        <BootstrapTable data={this.props.employee} version='4' pagination={true} options={options} ref='table' search>
                                            <TableHeaderColumn isKey dataField='id' hidden={this.state.hidden}>ID</TableHeaderColumn>
                                            <TableHeaderColumn dataField='name'  dataSort={true} width='15%'>Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='email' dataSort={true} width='20%'>Email</TableHeaderColumn>
                                            <TableHeaderColumn dataField='phone' dataSort={true} width='15%'>Phone</TableHeaderColumn>
                                            <TableHeaderColumn dataField='department' dataSort={true} width='15%'>Department</TableHeaderColumn>
                                            <TableHeaderColumn dataField='button' dataFormat={this.actionButton.bind(this)}>Action</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                                </div>
                            </JarvisWidget>                    
                        </article>
                    </div>
                </WidgetGrid>

                {/***** Add Model Body Start  *****/}
                <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title" id="myModalLabel">Add Employee</h4>
                            </div>
                            <form className="" method="post"  name="employeeRegistrationForm"  onSubmit= {this.submitemployeeRegistrationForm} >
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" className="form-control" name="name" id="name" placeholder="" onChange={this.handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="text" className="form-control" name="email" id="email" placeholder="" onChange={this.handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone</label>
                                                <input type="text" className="form-control" name="phone" id="phone" placeholder="" onChange={this.handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Department</label>
                                                <select className="input-sm form-control" name="department" onChange={this.handleChange}>
                                                    <option value="0">Choose Department</option>
                                                    <option value="PHP Developer">PHP Developer</option>
                                                    <option value="Android Developer">Android Developer</option>
                                                    <option value="iOS Developer">iOS Developer</option>
                                                    <option value="BDE">BDE</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*****  Add Model Body End  *****/}

                {/*****  Edit Model Body Start  *****/}
                    <Modal show={this.state.modalEdit}>
                        <form className="" method="post"  name="employeeEditForm">
                            <Modal.Body>
                                <h1>Edit Employee</h1>
                                <hr className="simple" />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input type="text" className="form-control" name="name" id="name" placeholder="" onChange={this.handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input type="text" className="form-control" name="email" id="email" placeholder="" onChange={this.handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone</label>
                                                <input type="text" className="form-control" name="phone" id="phone" placeholder="" onChange={this.handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phone">Department</label>
                                                <select className="input-sm form-control" name="department" onChange={this.handleChange}>
                                                    <option value="0">Choose Department</option>
                                                    <option value="PHP Developer">PHP Developer</option>
                                                    <option value="Android Developer">Android Developer</option>
                                                    <option value="iOS Developer">iOS Developer</option>
                                                    <option value="BDE">BDE</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                <div className="text-right">
                                    <button type="button" className="btn btn-success btn-lg" onClick={this.toggleEdit}>Cancel</button>&nbsp;&nbsp;
                                    <button type="button" className="btn btn-success btn-lg" onClick={this.props.onHide}>Save</button>
                                </div>
                            </Modal.Body>
                        </form>
                    </Modal>
                {/*****  Edit Model Body End  *****/}

            </div>
        );
    }
}

const mapDispatchToProps = { empGetEvent ,empAddEvent}
const mapStateToProps = state => ({ employee: state.employee })
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)
