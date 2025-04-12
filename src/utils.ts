export function parseComponentName(filePath: string): string {
  const fileName = filePath.split(/[\\/]/).pop() || "";
 
  const baseName = fileName.replace(/\.tsx$/, "");
 
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
 
import { AdminContext, useDataProvider } from "react-admin";
import { waitFor } from "@testing-library/react";
import ${componentName} from "${sanitizedImportPath}";
 
// Mocks
 
jest.mock("@airborne/react-admin", () => ({
Can: ({ children }) => <>{children}</>,
  useMinio: () => ({
 
    convertUrl: (url: string) => \`mocked-url/\${url}\`,
 
  }),
  DateTimeInput: jest.fn(() => <div>DateTimeInput</div>),
  cockpitDataProvider: jest.fn(() => ({
   
  })),
  useVerifyPermission: jest.fn(() => true),
  useAuth: () => ({
 
    user: {
 
      roles: ["admin"],
 
      isCustomer: false,
 
      employeeId: "12345",
 
    },
 
  }),
 
  getEnvironmentConfig: jest.fn(() => ({
    api: {
      baseUrl: "https://mocked-api.com",
    },
    apiBaseUrl: "https://mocked-api.com",
  })),
 
  useDocumentTitle: () => {},
 
  useAccessControl: () => ({
 
    canEdit: true,
 
    canDelete: true,
 
    canCreate: true,
 
    canView: true,
 
  }),
 
}));
 
jest.mock("qs", () => ({
 
  parse: jest.fn(() => ({ aircraftId: "mockAircraftId" })),
 
}));
 
try {
  jest.mock("moment", () => {
    const moment = () => ({
      format: () => "mocked-format",
      diff: () => 0,
      toDate: () => new Date(),
      year: () => ({ format: () => "mocked-year" }),
    });
    moment.locale = () => {};
    return moment;
  });
} catch (err) {
  // moment yoksa sessizce geç
}
 
jest.mock("react-admin", () => {
 
  const original = jest.requireActual("react-admin");
 
  return {
 
    ...original,
 
    useListContext: () => ({
      data: { 1: { id: 1, name: "Mock item" } },
      ids: [1],
      isLoading: false,
      filterValues: {},
      total: 1,
      sort: { field: "id", order: "ASC" },
      perPage: 10,
      setFilters: jest.fn(),
      setSort: jest.fn(),
      setPage: jest.fn(),
      page: 1,
      displayedFilters: {},
      showFilter: jest.fn(),
      hideFilter: jest.fn(),
      selectedIds: [],
      onSelect: jest.fn(),
      onToggleItem: jest.fn(),
      onUnselectItems: jest.fn(),
      currentSort: { field: "id", order: "ASC" },
    }),
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
DateTimeInput: jest.fn(() => <div>DateTimeInput</div>),
    useNotify: () => jest.fn(),
 
    useRefresh: () => jest.fn(),
 
    useRedirect: () => jest.fn(),
    useAuthenticated: () => {},
    useCreateSuggestionContext: () => ({
      filter: "mockFilter",
      onCancel: jest.fn(),
      onCreate: jest.fn(),
    }),
  };
 
});
 
jest.mock("react-router-dom", () => ({
 
  ...jest.requireActual("react-router-dom"),
 
  useParams: () => ({
 
    projectId: "mockProjectId",
 
    aircraftId: "mockAircraftId",
 
  }),
 
}));
jest.mock("lodash", () => ({
  pick: jest.fn((obj, keys) => {
    const result = {};
    keys.forEach((key) => {
      result[key] = obj[key];
    });
    return result;
  }),
  map: jest.fn((arr, fn) => arr.map(fn)),
}));
jest.mock("papaparse", () => ({
  unparse: jest.fn(() => "csv-data"),
  parse: jest.fn(() => ({ data: [["parsed"]] })),
}));
 
jest.mock("file-saver", () => ({
  saveAs: jest.fn(),
}));
 
jest.mock("xlsx", () => ({
  utils: {
    json_to_sheet: jest.fn(() => ({})),
  },
  write: jest.fn(() => []),
}));
 
const _dataProvider = useDataProvider();
 
const theme = createTheme();
 
describe("${componentName} Snapshot from haktan-test-generator", () => {
 
  it("should render correctly", async () => {
 
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