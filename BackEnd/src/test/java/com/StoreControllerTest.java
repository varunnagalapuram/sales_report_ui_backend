package com;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.dao.Stores;
import com.repo.SalesRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class StoreControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private SalesRepository mockRepository;

	@Before
	public void init() {

		Stores store = new Stores();
		store.setStore_id(1L);
		store.setDist_taxi(222);
		store.setDist_market(111);
		store.setDist_metro(11);
		store.setItems_available(2);
		store.setStore_area("Adambakkam");
		store.setStore_sales(1);
		store.setDaily_cust_count(99);
		store.setParking("Open");
		store.setCoupon_category("CAT B");
		when(mockRepository.findById(1L)).thenReturn((store));
	}

	// @WithMockUser(username = "USER")
	@WithMockUser("user")
	@Test
	public void find_login_ok() throws Exception {

		mockMvc.perform(get("/stores/1")).andDo(print()).andExpect(status().isOk())
				.andExpect(jsonPath("$.store_id", is(1)))
				.andExpect(jsonPath("$.dist_taxi", is(222.0)))
				.andExpect(jsonPath("$.dist_market", is(111.0)))
				.andExpect(jsonPath("$.dist_metro", is(11.0)))
				.andExpect(jsonPath("$.items_available",is(2.0)))
				.andExpect(jsonPath("$.daily_cust_count",is(99.0)))
				.andExpect(jsonPath("$.store_sales",is(1.0)))
				.andExpect(jsonPath("$.store_area",is("Adambakkam")))
				.andExpect(jsonPath("$.parking",is("Open")))
				.andExpect(jsonPath("$.coupon_category",is("CAT B")));
	}

	@Test
	public void find_nologin_401() throws Exception {
		mockMvc.perform(get("/stores/1")).andDo(print()).andExpect(status().isUnauthorized());
	}

}