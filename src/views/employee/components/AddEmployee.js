import React from "react";

import { WidgetGrid } from "../../../common/widgets/components";
import { BigBreadcrumbs } from "../../../common/navigation";
import {JarvisWidget} from "../../../common";
import { connect } from 'react-redux'

import { empGetEvent } from "../../../action/employeeEvent.js";

class AddEmployee extends React.Component {

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
    await this.props.empGetEvent(this.state.fields)
    //this.props.history.push('/')

    alert("form submited");
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
      <div id="content" className="animated fadeInUp">
        <div className="row">
          <BigBreadcrumbs
            items={["Employee", "Add Employee"]}
            className="col-xs-12 col-sm-7 col-md-7 col-lg-4"
          />          
        </div>

        <WidgetGrid>
          <div className="row">
            <article className="col-sm-12">
            <JarvisWidget
                id="wid-id-1"
                colorbutton={false}
                editbutton={false}
                custombutton={false}
              >
                <header>
                  <span className="widget-icon">
                    <i className="fa fa-edit" />
                  </span>

                  <h2>Add New Employee</h2>
                </header>

                {/* widget div*/}
                <div>
                  {/* widget content */}
                  <div className="widget-body no-padding">
                    
                    <form className="smart-form" method="post"  name="employeeRegistrationForm"  onSubmit= {this.submitemployeeRegistrationForm} >
                      
                      <fieldset>
                       
                        <section>
                          <label className="label">Name</label>
                          <label className="input">
                            <input type="text" maxLength="10" id="name" name="name" onChange={this.handleChange} />
                          </label>
                          {/* <div className="note">
                            <strong>Maxlength</strong> is automatically added via the "maxLength='#'" attribute
                          </div> */}
                        </section>

                        <section>
                          <label className="label">Email</label>
                          <label className="input">
                            <input type="text" id="email" name="email" onChange={this.handleChange} />
                          </label>
                          {/* <div className="note">
                            <strong>Maxlength</strong> is automatically added via the "maxLength='#'" attribute
                          </div> */}
                        </section>

                        <section>
                          <label className="label">Phone</label>
                          <label className="input">
                            <input type="text" id="phone" name="phone" onChange={this.handleChange} />
                          </label>
                          {/* <div className="note">
                            <strong>Maxlength</strong> is automatically added via the "maxLength='#'" attribute
                          </div> */}
                        </section>

                        <section>
                          <label className="label">Department</label>
                          <label className="input">
                            <input type="text" maxLength="10" id="department" name="department" onChange={this.handleChange} />
                          </label>
                        </section>

                      </fieldset>

                      <footer>
                        <input type="submit" className="btn btn-primary"/>
                        <button type="button" className="btn btn-default">
                          Back
                        </button>
                      </footer>
                    </form>
                  </div>
                  {/* end widget content */}
                </div>
                {/* end widget div */}
              </JarvisWidget>
             
            </article>
          </div>
        </WidgetGrid>
      </div>
    );
  }
}

const mapDispatchToProps = { empGetEvent }

export default connect(null, mapDispatchToProps)(AddEmployee)
