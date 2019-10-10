import React from "react";

import { WidgetGrid } from "../../../common/widgets/components";
import { BigBreadcrumbs } from "../../../common/navigation";
import {JarvisWidget} from "../../../common";
import Datatable from "../../../common/tables/components/Datatable";
import { connect } from 'react-redux'
import { empGetEvent,empAddEvent } from "../../../common/employee/employeeAction.js";

class EmployeeList extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitemployeeRegistrationForm = this.submitemployeeRegistrationForm.bind(this);
    
        this.state = {
          fields : {},
          error : {}
        }    
    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({fields});
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
        return (
        <div id="content" className="">
            <div className="row">
                <BigBreadcrumbs
                    items={["Employee", "Employee List"]}
                    className="col-xs-12 col-sm-7 col-md-7 col-lg-4"
                />       
                <button className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Add New Employee</button>
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
                                <div className="widget-body no-padding">
                                    <Datatable
                                        options={{
                                            ajax: "http://192.168.0.157/reactApp/React_16.x/server/employee.php?action=index",
                                            columns: [
                                                { data: "id" },
                                                { data: "name" },
                                                { data: "email" },
                                                { data: "phone" },
                                                { data: "department" },
                                                { data: "status" }                                        
                                            ]
                                        }}
                                        paginationLength={true}
                                        className="table table-striped table-bordered table-hover"
                                        width="100%"
                                    >
                                    <thead>
                                        <tr>
                                        <th data-hide="phone">ID</th>
                                        <th data-class="expand">
                                            <i className="fa fa-fw fa-user text-muted hidden-md hidden-sm hidden-xs" />
                                            Name
                                        </th>
                                        <th data-hide="phone">
                                            <i className="fa fa-fw fa-phone text-muted hidden-md hidden-sm hidden-xs" />
                                            Email
                                        </th>
                                        <th>Phone</th>
                                        <th data-hide="phone,tablet">
                                            <i className="fa fa-fw fa-map-marker txt-color-blue hidden-md hidden-sm hidden-xs" />
                                            Department
                                        </th>
                                        <th data-hide="phone,tablet">Status</th>                                        
                                        </tr>
                                    </thead>
                                    </Datatable>
                                </div>
                            </div>
                        </JarvisWidget>                    
                    </article>
                </div>
            </WidgetGrid>
            {/***** Model Body Start  *****/}
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
            {/*****  Model Body End  *****/}
      </div>
    );
  }
}

const mapDispatchToProps = { empGetEvent ,empAddEvent}

export default connect(null, mapDispatchToProps)(EmployeeList)