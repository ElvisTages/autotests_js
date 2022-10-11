const { spec } = require("pactum");
let url = "http://localhost:3000";
test("Swagger", async () => {
  await spec()
    .get(url + "/api/")
    .expectStatus(200);
});
test("/pforms_createTemplate", async () => {
  await spec()
    .post(url + "/pforms_createTemplate?template_key=AUTOTEST&full_name=UPD")
    .withFile("html", "./html.html")
    .expectStatus(200);
});
test("/pForms_makePDF", async () => {
  let new_post = {
    template_key: "AUTOTEST",
    data: {
      VIN: "XWEDC41EBK0005314",
    },
  };

  await spec()
    .post(url + "/pForms_makePDF")
    .withJson(new_post)
    .expectStatus(200)
    .expectBodyContains("uuid");
});
test("/pforms_getPDF", async () => {
  await spec()
    .get(url + "/pforms_getPDF?uuid=f04ea452-5132-4a3d-ad42-b0500ade0966")
    .expectStatus(200)
    .expectBodyContains("link");
});
test("/pForms_updateFormStatus", async () => {
  let new_post = {
    uuid: "e1ff37bd-239d-4ca2-a160-71e5933ad57c",
    status: 3,
  };
  await spec()
    .post(url + "/pForms_updateFormStatus")
    .withJson(new_post)
    .expectStatus(200);
});

test("/pforms_getTemplate", async () => {
  await spec()
    .get(url + "/pforms_getTemplate?template_key=AUTOTEST")
    .expectStatus(200)
    .expectBodyContains("id");
});
test("/pforms_getListTemplate", async () => {
  await spec()
    .get(url + "/pforms_getListTemplate")
    .expectStatus(200);
});
test("/pforms_deleteTemplate", async () => {
  await spec()
    .delete(url + "/pforms_deleteTemplate?template_key=AUTOTEST")
    .expectStatus(200);
});
