/* -------------- Components---------------------------------- */
import CanvasModel from "./Components/3dModel";
import RoadmapComponent from "./Components/RoadmapComponent";
/* ---------------------------------------------------------- */
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import create from "zustand";

export const client = new ApolloClient({
  uri: "https://api-eu-central-1.graphcms.com/v2/cl39zv7no07cu01z2gjet3ce5/master",
  cache: new InMemoryCache(),

  // Provide some optional constructor fields
  name: "react-web-client",
  version: "1.3",
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export const useUIStore = create((set) => ({
  homeRoute: null,
  homeRotation: null,
  clickedState: true,
  clickedToolsState: false,
  clickedProjectsState: false,
  setHomeRoute: (value) => set((state) => ({ homeRoute: value })),
  setHomeRotation: (value) => set((state) => ({ homeRotation: value })),
  setHomeState: (value) => set((state) => ({ clickedState: value })),
  setClickedToolsState: (value) => set((state) => ({ clickedToolsState: value })),
  setClickedProjectsState: (value) => set((state) => ({ clickedProjectsState: value })),
}));

export default function App() {
  return (
    <ApolloProvider client={client}>
      <CanvasModel />
      <RoadmapComponent />
    </ApolloProvider>
  );
}
