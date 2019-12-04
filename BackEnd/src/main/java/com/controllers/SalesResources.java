package com.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dao.Stores;
import com.repo.SalesRepository;
import com.service.SalesFetchService;
import com.service.StoreDeletionServiceInt;

@RestController
@CrossOrigin(origins = { "https://4wcmx.csb.app","http://localhost:3000","http://localhost:3002", "http://localhost:4200" })
public class SalesResources {

	@Autowired
	private SalesFetchService salesService;
	
	@Autowired
	private StoreDeletionServiceInt storedeletionservice;
	
	@Autowired
    SalesRepository salesRepository;

    @GetMapping("/stores")
    public List<Stores> index(){
        return salesRepository.findAll();
    }

    @GetMapping("/stores/{id}")
    public Stores show(@PathVariable String id){
        int storeId = Integer.parseInt(id);
        Stores t=salesRepository.findById(storeId);
        return t==null?null:t;
    }
    
    @GetMapping("/stores/parking/{parking}")
    public List<Stores> showParkingStatus(@PathVariable String parking){
    
        String sa = (parking.equalsIgnoreCase("not provided")?("Not provided").toUpperCase():parking.equalsIgnoreCase("provided")?("open"+","+"closed").toUpperCase():"exit");
       // System.out.println(sa);
        if(sa.equals("exit")){
              return null;
        }
        if(sa.split(",").length==1){
        return salesRepository.findByParkingNA(sa);
        }
        else{
              String temp[]=sa.split(",");
               return salesRepository.findByParking(temp[0],temp[1]);
        }
    }
    
    @GetMapping("/stores/parking/provided/{type}")
    public List<Stores> showParkingType(@PathVariable String type){
    
        String sa = (type.equalsIgnoreCase("open")?("open").toUpperCase():type.equalsIgnoreCase("covered")?("covered").toUpperCase(): "exit");
        if(sa.equals("exit")){
              return null;
        }
         return salesRepository.findByParkingNA(sa);
        
    }


    
    @GetMapping("/stores/area/{storeArea}")
    public List<Stores> showArea(@PathVariable String storeArea){
        //String storeId = (id);
        return salesRepository.findByArea(storeArea);
    }
    
    @GetMapping("/stores/delete/{id}")
    public String delete(@PathVariable String id){
        long storeId = Integer.parseInt(id);
        salesRepository.deleteById(storeId);
        return "store with id "+storeId+" has been deleted";
    }
    @GetMapping("/stores/deleteall")
    public String deleteAll(){
        salesRepository.deleteAll();
        return "All stores has been deleted";
    }
	
	@GetMapping("/load")
	public String getAllSales() {
		for(Stores s : salesService.findAll()){
			salesRepository.save(s);
		}
		return "Successfully loaded into DB from EXCEL";
	}
	
	@DeleteMapping("/stores/delete/store/{id}")
	  public ResponseEntity<Void> deleteStore( @PathVariable long id) {

	    Stores store = storedeletionservice.deleteStoreById(id);

	    if (store != null) {
	      return ResponseEntity.noContent().build();
	    }

	    return ResponseEntity.notFound().build();

	}
	
	
	@PutMapping("/stores/update/{storeId}")
	@CrossOrigin(origins = { "http://localhost:3000","http://localhost:3001", "http://localhost:4200" })
	public ResponseEntity<Stores> updateStoreById(@PathVariable long storeId,
            @Valid @RequestBody Stores storeDetails){

        Stores store = salesRepository.findById(storeId);//.orElse(null);

        
      
        if(storeDetails.getDist_taxi()!=store.getDist_taxi())
        {
        store.setDist_taxi(storeDetails.getDist_taxi());
        System.out.println("updated Successfully");
        }
        if(storeDetails.getDist_metro()!=store.getDist_metro())
        {
        store.setDist_metro(storeDetails.getDist_metro());
        System.out.println("updated Successfully");
        }
        if(storeDetails.getDist_market()!=store.getDist_market())
        {
        store.setDist_market(storeDetails.getDist_market());
        System.out.println("updated Successfully");
        }

        final Stores updatedStore = salesRepository.save(store);
        System.out.println("store Put Request"+ updatedStore);

        return ResponseEntity.ok().body(updatedStore);
    }
	

	@RequestMapping("/")
	public String home() {
		return "Hello World!";
	}
}
