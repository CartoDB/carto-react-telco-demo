# CARTO for React Telco Demo

This demo app has been created by our partner [Thinking Machines](https://thinkinmachin.es) and uses premium datasets from our data partner [Experian](https://www.experian.com/) and other publicly available datasets.

The application has been deployed to the following URL:

[https://telco-demo-react.carto.com](https://telco-demo-react.carto.com)

In the project directory, you can run:

`yarn start`

Runs the app in the development mode.<br />
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

`yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Datasets

The application uses the following premium and open datasets:

- [Experian](https://experian.com) WorldView Socio-Demographics, Consumer Spending and Consumer Segments
- [Facebook](https://research.fb.com/downloads/high-resolution-settlement-layer-hrsl/) High Resolution Settlement Layer (HRSL)
- [OpenCelliD](https://www.opencellid.org/) cell towers open database with dummy company data for demo purposes
- [Ookla](https://www.ookla.com/) Speedtest Intelligence [data](https://registry.opendata.aws/speedtest-global-performance/)

For the above datasets, the application uses pre-generated tilesets using CARTO's [BigQuery Tiler](https://carto.com/bigquery-tiler) for fast visualization, except for the OpenCelliD dataset that it is stored in the CARTO database.

In addition to these datasets, the application uses three additional custom created datasets for market coverage, potential revenue and the dataset used for the capex view. For all these datasets we have also pre-generated tilesets.

## Authentication/Authorization and Data Management

This application follows a common pattern used when you want to design an application that uses public datasets and private datasets that are only shared with members from the same CARTO organization. The tilesets are public and the OpenCelliD dataset is private.

We have an organization called `developers` with an owner called `developers-admin`. This user has uploaded the OpenCelliD dataset to his CARTO account and has shared it with another member of the organization whose username is `developers-viewer`. You need to use the credentials for this user if you want to log into the application.

The application uses OAuth so when you enter the credentials, the application requests access to the resources (scopes) it needs. Unless you download the code and start your own local development server with a new OAuth app client id, you are not going to see the Oauth scopes dialog.

These are the credentials you need to use for accessing the application:

- User: `developers-viewer`
- Password: `viewer`

## Views

The application includes two views:

- **Profiling**. This view allows you to analyze the geographic profiling of the region we are studying. It uses a layer selector component that lets you show or hide each individual layer. When the user activates the visualization of a layer, the widgets associated to the layer are shown in the sidebar.

- **CAPEX**. This view allows you to perform a suitability analysis by changing in real-time the weights applied to the different variables that compose a layer.

## Layers, legends and tooltips

All the layers in the profiling view follow a similar **design**: at the top there are two arrays defined with the colors that will be used for styling the layer and the labels that will be shown in the legend. Then we create the layer object that will be returned defining the `getFillColor` accessor to show a choropleth map. The `SummaryHexLayer` used in the capex view is slightly different because it adjust the color based on the slider values chosen by the user.

The layers in the profiling view also define the `onHover` event handler that will display a custom **tooltip**. There is a different tooltip function for each layer. The functions create a React component using Material-UI. This is a different approach to the HtmlForFeature function provided in the CARTO for React templates that is suitable for those cases where you want to have full control of tooltip rendering.

**Legends** are implemented using a main `Legend` component that takes care of adding the individual legend components for those layers that are currently shown in the map. Each individual legend component returns a grid where each row contains the color and the label as defined in the corresponding layer.

There is a component called `LayerSelect` that allows the user to show/hide layers on demand in the profiling view. This component consists of a title and a grid of checkboxes (one for each layer). When the checkbox is clicked, a function is executed that takes care of adding or removing the layer from the map by dispatching the `addLayer` or `removeLayer` actions.

## Widgets

The application includes many widgets to demonstrate how they can be used to analyze the information currently shown in the map.

All the widgets are defined in the profiling view and are shown only if the associated layer is currently displayed in the map.

Some of the widgets include custom formatters for the values and/or the axis labels.
