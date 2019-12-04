package com.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.dao.Stores;

@Service
public class SalesFetchServiceImpl implements SalesFetchService {
	private static ArrayList<Stores> sales = new ArrayList<Stores>();
	public static final String FILE_PATH = "Book1.xlsx";

	public ArrayList<Stores> findAll() {

		sales = getSalesList();
		return sales;
	}

	// get file from classpath, resources folder
	private File getFileFromResources(String fileName) {

		ClassLoader classLoader = getClass().getClassLoader();

		URL resource = classLoader.getResource(fileName);
		if (resource == null) {
			throw new IllegalArgumentException("file is not found!");
		} else {
			return new File(resource.getFile());
		}

	}

	public static ArrayList<Stores> getSalesList() {
		ArrayList<Stores> salesList = new ArrayList<Stores>();
		FileInputStream fis = null;
		try {
			SalesFetchServiceImpl main = new SalesFetchServiceImpl();
			File file = main.getFileFromResources(FILE_PATH);
			fis = new FileInputStream(file);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		try {

			// Using XSSF for xlsx format, for xls use HSSF
			Workbook workbook = new XSSFWorkbook(fis);

			int numberOfSheets = workbook.getNumberOfSheets();

			// looping over each workbook sheet
			for (int i = 0; i < numberOfSheets; i++) {
				Sheet sheet = workbook.getSheetAt(i);
				Iterator<Row> rowIterator = sheet.iterator();

				// iterating over each row
				int c = 0;
				while (rowIterator.hasNext()) {

					Stores sales = new Stores();
					Row row = (Row) rowIterator.next();
					if (c == 0) {
						c++;
						continue;
					}
					Iterator<Cell> cellIterator = row.cellIterator();

					// Iterating over each cell (column wise) in a particular
					// row.
					while (cellIterator.hasNext()) {

						Cell cell = (Cell) cellIterator.next();
						if (cell.getColumnIndex() == 0) {
							sales.setStore_id((long) (Double.parseDouble(String.valueOf(cell.getNumericCellValue()))));
						} else if (cell.getColumnIndex() == 1) {
							sales.setDist_taxi(Double.parseDouble(String.valueOf(cell.getNumericCellValue())));
						} else if (cell.getColumnIndex() == 2) {
							sales.setDist_market(Double.parseDouble(String.valueOf(cell.getNumericCellValue())));
						} else if (cell.getColumnIndex() == 3) {
							sales.setDist_metro(Double.parseDouble(String.valueOf(cell.getNumericCellValue())));
						} else if (cell.getColumnIndex() == 4) {
							sales.setStore_area((String.valueOf(cell.getStringCellValue())));
						} else if (cell.getColumnIndex() == 5) {
							sales.setItems_available(Double.parseDouble(String.valueOf(cell.getNumericCellValue())));
						} else if (cell.getColumnIndex() == 6) {
							sales.setParking(String.valueOf(cell.getStringCellValue()));
						} else if (cell.getColumnIndex() == 7) {
							sales.setCoupon_category(String.valueOf(cell.getStringCellValue()));
						} else if (cell.getColumnIndex() == 8) {
							sales.setDaily_cust_count(Double.parseDouble(String.valueOf(cell.getNumericCellValue())));
						} else if (cell.getColumnIndex() == 9) {
							sales.setStore_sales(Double.parseDouble(String.valueOf(cell.getNumericCellValue())));
						}

					}
					// end iterating a row, add all the elements of a row in
					// list
					salesList.add(sales);
				}
			}
			// workbook.close();
			fis.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return (salesList);
	}

	public ArrayList<Stores> findAllWith() {
		// TODO Auto-generated method stub
		return null;
	}
}
