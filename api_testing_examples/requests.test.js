const { spec } = require("pactum");
let url = "http://localhost:3000";
test("Swagger", async () => {
  await spec()
    .get(url + "/api/")
    .expectStatus(200);
});
//CRUD of templates
test("/pforms_createTemplate", async () => {
  await spec()
    .post(url + "/pforms_createTemplate?template_key=AUTOTEST&full_name=Test")
    .withFile("template_body", "./html.html")
    .expectStatus(200);
});
test("/pforms_getTemplate", async () => {
  await spec()
    .get(url + "/pforms_getTemplate?template_key=AUTOTEST")
    .expectStatus(200);
});
test("/pforms_getListTemplate", async () => {
  await spec()
    .get(url + "/pforms_getListTemplate")
    .expectStatus(200);
});
test("/pforms_updateTemplate", async () => {
  await spec()
    .patch(
      url + "/pforms_updateTemplate?template_key=AUTOTEST&full_name=Update"
    )
    .withFile("template_body", "./html.html")
    .expectStatus(200);
});

test("/pforms_makePDF", async () => {
  let new_post = {
    data: {
      single_word: "XWEDC41EBK0005314",
    },
  };
  await spec()
    .post(url + "/pforms_makePDF?template_key=AUTOTEST")
    .withJson(new_post)
    .expectStatus(200)
    .expectBodyContains("uuid");
});
test("/pforms_getPDF", async () => {
  await spec()
    .get(url + "/pforms_getPDF?uuid=a430394d-42eb-4b90-bbca-343b369965d0")
    .expectStatus(200)
    .expectBodyContains("link");
});
test("/pforms_updateFormStatus", async () => {
  let new_post = {
    uuid: "a430394d-42eb-4b90-bbca-343b369965d0",
    status: 3,
  };
  await spec()
    .post(url + "/pforms_updateFormStatus")
    .withJson(new_post)
    .expectStatus(200);
});

test("/pforms_getListPDF", async () => {
  let new_post = ["a430394d-42eb-4b90-bbca-343b369965d0"];
  await spec()
    .post(url + "/pforms_getListPDF?form_status=3")
    .withJson(new_post)
    .expectStatus(200);
});
test("/pforms_getPDF", async () => {
  await spec()
    .get(url + "/pforms_getPDF?uuid=a430394d-42eb-4b90-bbca-343b369965d0")
    .expectStatus(200)
    .expectBodyContains("link");
});

test("/pforms_updatePDF", async () => {
  let new_post = {};
  await spec()
    .post(url + "/pforms_updatePDF?uuid=a430394d-42eb-4b90-bbca-343b369965d0")
    .withJson(new_post)
    .expectStatus(200);
});

test("/pforms_deleteTemplate", async () => {
  await spec()
    .delete(url + "/pforms_deleteTemplate?template_key=AUTOTEST")
    .expectStatus(200);
});
