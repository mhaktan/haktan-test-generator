export function parseComponentName(filePath: string): string {
  const fileName = filePath.split(/[\\/]/).pop() || "";

  const baseName = fileName.replace(/\.tsx$/, "");

  // PascalCase dönüşümü: örneğin "create" → "Create"

  return baseName.charAt(0).toUpperCase() + baseName.slice(1);
}

export function createSnapshotTestContent(
  componentName: string,
  importPath: string
): string {
  const sanitizedImportPath = importPath.replace(/\.tsx$/, "");

  return `

import React from "react";

import { render } from "@testing-library/react";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import { AdminContext,useDataProvider } from "react-admin";


import ${componentName} from "${sanitizedImportPath}";
 
// Mocks
jest.mock("@airborne/react-admin", () => ({
  useMinio: () => ({
    convertUrl: (url: string) => \`mocked-url/\${url}\`,
  }),
  useAuth: () => ({
    user: {
      roles: ["admin"],
      isCustomer: false,
      employeeId: "12345",
    },
  }),
  getEnvironmentConfig: () => ({
    apiBaseUrl: "https://mocked-api.com",
  }),
}));
 
jest.mock("qs", () => ({
  parse: jest.fn(() => ({ aircraftId: "mockAircraftId" })),
}));
 
jest.mock("moment", () => {
  const moment = () => ({
    format: () => "2024",
    year: () => ({ format: () => "2024" }),
    toDate: () => new Date("2024-01-01"),
  });
  moment.locale = () => {};
 
  return moment;
});
 
jest.mock("react-admin", () => {
  const original = jest.requireActual("react-admin");
  return {
    ...original,
    useDataProvider: () => ({
      getList: jest.fn().mockResolvedValue({ data: [], total: 0 }),
      getOne: jest.fn().mockResolvedValue({ data: {} }),
      getMany: jest.fn().mockResolvedValue({ data: [] }),
      getManyReference: jest.fn().mockResolvedValue({ data: [], total: 0 }),
      create: jest.fn().mockResolvedValue({ data: {} }),
      update: jest.fn().mockResolvedValue({ data: {} }),
      updateMany: jest.fn().mockResolvedValue({ data: [] }),
      delete: jest.fn().mockResolvedValue({ data: {} }),
      deleteMany: jest.fn().mockResolvedValue({ data: [] }),
    }),
    useNotify: () => jest.fn(),
    useRefresh: () => jest.fn(),
    useRedirect: () => jest.fn(),
  };
});
 
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    projectId: "mockProjectId",
    aircraftId: "mockAircraftId",
  }),
}));
 
const _dataProvider = useDataProvider();

const theme = createTheme();
 
describe("${componentName} Snapshot from haktan-test-generator", () => {

  it("should render correctly", () => {

    const { asFragment } = render(
<ThemeProvider theme={theme}>
<AdminContext dataProvider={_dataProvider}>
<${componentName} />
</AdminContext>
</ThemeProvider>

    );

    expect(asFragment()).toMatchSnapshot();

  });

});

`.trim();
}
