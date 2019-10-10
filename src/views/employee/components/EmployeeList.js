import React from "react";

import { WidgetGrid } from "../../../common/widgets/components";
import { BigBreadcrumbs } from "../../../common/navigation";
import {JarvisWidget} from "../../../common";
import Datatable from "../../../common/tables/components/Datatable";

export default class Employee extends React.Component {
  render() {
    return (
      <div id="content" className="animated fadeInUp">
        
        <div className="row">
          <BigBreadcrumbs
            items={["Employee", "Employee List"]}
            className="col-xs-12 col-sm-7 col-md-7 col-lg-4"
          />          
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
                            Phone
                          </th>
                          <th>Company</th>
                          <th data-hide="phone,tablet">
                            <i className="fa fa-fw fa-map-marker txt-color-blue hidden-md hidden-sm hidden-xs" />
                            Zip
                          </th>
                          <th data-hide="phone,tablet">City</th>
                        </tr>
                      </thead>
                    </Datatable>
                  </div>
                </div>
              </JarvisWidget>
             
            </article>
          </div>
        </WidgetGrid>
      </div>
    );
  }
}
