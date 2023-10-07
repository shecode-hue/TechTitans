import React from "react";

const About = () => {
  return (
    <div className="container u-justify-center">
      <div className="card" style={{ width: "80%" }}>
        <div className="content u-text-center pt-3">
          <div className="header u-justify-center p-2">
            <h3 id="projectname" className="">
              About The Namibian Fire Monitiing and Recording System
            </h3>
          </div>
          <div className="text-container px-10">
            <p>
              Veld fires also referred to as wildfires are bush fires both
              within and outside urban areas, that have the potential to spread
              out of control destroying everything in its path. In 2021 it is
              estimated that a staggering 2.5 million hectors of grazing land
              was affected by forested fires , this includes land on 604 farms
              and many protected areas.{" "}
            </p>

            <p>
              Etosha National Park also lost 22% of its grazing land to veld
              fires, considering that tourism and agriculture are the backbone
              of Namibia these are frightening figures. Most fires are caused by
              people compared to a small amount which occur natural, being able
              to predict the small number of fires that occur naturally could
              prevent further damage to the natural environment.{" "}
            </p>
            <p>
              The Namibian Fire Montoring and Recording System is an application that
              monitors and records fires and stores the data in a database. The
              system uses data from the Namibian Fire Brigade. The system is designed to be used by the Namibian Fire
              Brigade to help them make informed decisions about where to deploy
              their resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
