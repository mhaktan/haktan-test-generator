// jest.setup.ts içeriği

import "@testing-library/jest-dom";

import serializer from "./test-config/snapshotSerializers";

import { DataProvider } from "react-admin";

expect.addSnapshotSerializer(serializer);

// @airborne/react-admin mock
