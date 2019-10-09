import React from "react";

import { WidgetGrid } from "../../../common/widgets/components";
import { BigBreadcrumbs } from "../../../common/navigation";


export default class Employee extends React.Component {
  render() {
    return (
      <div id="content" className="animated fadeInUp">
        <div className="row">
          <BigBreadcrumbs
            items={["Employee", "Employee List"]}
            className="col-xs-12 col-sm-7 col-md-7 col-lg-4"
          />
          {/* <Stats /> */}
        </div>

        <WidgetGrid>
          <div className="row">
            <article className="col-sm-12">
              {/* <LiveFeeds /> */}
            </article>
          </div>

          <div className="row">
            <article className="col-sm-12 col-md-12 col-lg-6">
              {/* <ChatWidget /> */}

              {/* <FullCalendarWidget /> */}
            </article>

            <article className="col-sm-12 col-md-12 col-lg-6">
              {/* <BirdEyeWidget /> */}

              {/* <TodoWidget /> */}
            </article>
          </div>
        </WidgetGrid>
      </div>
    );
  }
}
