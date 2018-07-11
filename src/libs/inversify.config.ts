import { Container } from "inversify";
import { TYPES } from "./TYPES";
import { Utils } from "./utils";
import { Authenticate } from "./authenticate";

const myContainer = new Container();
myContainer.bind<Utils>(TYPES.Authenticate).to(Utils);
myContainer.bind<Authenticate>(TYPES.Utils).to(Authenticate);

export { myContainer };