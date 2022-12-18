package com.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.nio.file.attribute.DosFileAttributes;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/file")
public class FileController {
    @GetMapping("/list")
    public List<JSONObject> listFiles(@RequestParam(defaultValue = "C:\\Users\\Vicky\\Downloads\\backend-service-main\\backend-service-main") String path) throws IOException, UncheckedIOException {
        AtomicInteger index = new AtomicInteger();
        List files = Files.list(Paths.get(path))
                .map(file -> {
                    try {
                        DosFileAttributes attributes = Files.readAttributes(file, DosFileAttributes.class);
                        BasicFileAttributes attributes1 = Files.readAttributes(file, BasicFileAttributes.class);
                        JSONObject a1 = new JSONObject(new ObjectMapper().writeValueAsString(attributes));
                        JSONObject a2 = new JSONObject(new ObjectMapper().writeValueAsString(attributes1));
                        JSONObject finalObject = new JSONObject();
                        finalObject.put("id", index.incrementAndGet());
                        finalObject.put("name", file.toFile().getName());
                        finalObject.put("isDir", attributes.isDirectory());
                        finalObject.put("path", file.toFile().getParent());
                        return finalObject.toMap().entrySet().stream().collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
                    } catch (IOException e) {
                        throw new UncheckedIOException(e);
                    }
                })
                .collect(Collectors.toList());
        return files;
    }

    @GetMapping("/get")
    public ResponseEntity<ByteArrayResource> get(@RequestParam String path) throws IOException, UncheckedIOException {
        File pdfFile = new File(path);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(MediaType.APPLICATION_OCTET_STREAM_VALUE));
        headers.add("Access-Control-Allow-Origin", "*");
        headers.add("Access-Control-Allow-Headers", "Content-Type");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");
        headers.setContentLength(pdfFile.getTotalSpace());
        InputStream targetStream = new FileInputStream(pdfFile);
        Path path1 = Paths.get(pdfFile.getAbsolutePath());
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path1));
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(pdfFile.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
//        return ResponseEntity.notFound().build();
    }

    public static <T, R> Function<T, R> wrap(CheckedFunction<T, R> checkedFunction) {
        return t -> {
            try {
                return checkedFunction.apply(t);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        };
    }

    @FunctionalInterface
    public interface CheckedFunction<T, R> {
        R apply(T t) throws IOException;
    }
}
