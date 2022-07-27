
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/Store/store";
import ActivityListItem from "./ActivitiyListItem";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { groupeActivities } = activityStore;

  return (
    <>
      {groupeActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>

          {activities.map((activity) => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
