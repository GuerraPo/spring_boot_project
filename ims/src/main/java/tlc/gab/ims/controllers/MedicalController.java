package tlc.gab.ims.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import tlc.gab.ims.entities.MedicalLaboratories;
import tlc.gab.ims.services.MedicalService;

@Controller
@RequestMapping("/medical")
public class MedicalController {

    @Autowired
    private MedicalService medicalService;

    @RequestMapping("/get-laboratory-list")
    public ResponseEntity<?> getLaboratoryList(){
        return medicalService.getLaboratoryList();
    }

    @PostMapping("/add-laboratory")
    public  ResponseEntity<?> addLaboratory(@ModelAttribute MedicalLaboratories lab){
        return medicalService.addLaboratory(lab);
    }

    @RequestMapping("/get-laboratory-details")
    public ResponseEntity<?> getLaboratoryDetails(@RequestParam int id){
        return medicalService.getLaboratoryDetails(id);
    }

    @RequestMapping("/delete-laboratory")
    public ResponseEntity<?> deleteLaboratory(@RequestParam int id){
        return medicalService.deleteLaboratory(id);
    }
}
