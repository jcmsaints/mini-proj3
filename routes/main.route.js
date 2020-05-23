const router = require("express").Router();
const controllerSpeaker = require("../controllers/speaker.controller.js");
const controllerSponsor = require("../controllers/sponsor.controller.js");
const controllerVolunteer = require("../controllers/volunteer.controller.js");
const controllerCommitee = require("../controllers/commitee.controller.js");
const controllerConference = require("../controllers/conference.controller.js");
const controllerMail = require("../controllers/mail.controller.js");
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");
router.get("/", function (req, res) {
  res.send("FCA Book");
  res.end();
});

router.get("/speakers/", controllerSpeaker.read);
router.get("/speakers/:id", controllerSpeaker.readID);
router.post("/speakers/", isLoggedIn, controllerSpeaker.save);
router.put("/speakers/:id", isLoggedIn, isLoggedIn, controllerSpeaker.update);
router.put("/speakers/del/:id", isLoggedIn, controllerSpeaker.deleteL);
router.delete("/speakers/:id", isLoggedIn, controllerSpeaker.deleteF);

router.get("/volunteer/", controllerVolunteer.read);
router.get("/volunteer/:id", controllerVolunteer.readID);
router.post("/volunteer/", isLoggedIn, controllerVolunteer.save);
router.put(
  "/volunteer/:id",
  isLoggedIn,
  isLoggedIn,
  controllerVolunteer.update
);
router.put("/volunteer/del/:id", isLoggedIn, controllerVolunteer.deleteL);
router.delete("/volunteer/:id", isLoggedIn, controllerVolunteer.deleteF);

router.get("/commitee/", controllerCommitee.read);
router.get("/commitee/:id", controllerCommitee.readID);
router.post("/commitee/", isLoggedIn, controllerCommitee.save);
router.put("/commitee/:id", isLoggedIn, isLoggedIn, controllerCommitee.update);
router.put("/commitee/del/:id", isLoggedIn, controllerCommitee.deleteL);
router.delete("/commitee/:id", isLoggedIn, controllerCommitee.deleteF);

router.get("/sponsors/", controllerSponsor.read);
router.get("/sponsors/:id", controllerSponsor.readID);
router.post("/sponsors/", isLoggedIn, controllerSponsor.save);
router.put("/sponsors/:id", isLoggedIn, controllerSponsor.update);
router.put("/sponsors/del/:id", isLoggedIn, controllerSponsor.deleteL);
router.delete("/sponsors/:id", isLoggedIn, controllerSponsor.deleteF);

router.get("/conferences", controllerConference.readConference);
router.get("/conferences/:id", controllerConference.readConferenceID);

router.get(
  "/conferences/:idconf/participants",
  controllerConference.readParticipant
);
router.post(
  "/conferences/:idconf/participants/:idparticipant/",
  controllerConference.saveParticipant
);
router.delete(
  "/conferences/:idconf/participants/:idparticipant",
  controllerConference.deleteParticipant
);

router.get("/conferences/:idconf/sponsors/", controllerConference.readSponsor);
router.post(
  "/conferences/:idconf/sponsors/:idsponsor",
  isLoggedIn,
  controllerConference.saveSponsor
);
router.delete(
  "/conferences/:idconf/sponsors/:idsponsor",
  isLoggedIn,
  controllerConference.deleteSponsor
);

router.get("/conferences/:idconf/speakers/", controllerConference.readSpeaker);
router.post(
  "/conferences/:idconf/speakers/:idspeaker",
  isLoggedIn,
  controllerConference.saveSpeaker
);
router.delete(
  "/conferences/:idconf/speakers/:idspeaker",
  controllerConference.deleteSpeaker
);

router.post("/contacts/emails", controllerMail.send);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    /*  res.status(jsonMessages.login.unauthorized.status).send(jsonMessages.login.unauthorized);*/
    return next();
  }
}
