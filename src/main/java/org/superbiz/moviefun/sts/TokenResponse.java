/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.superbiz.moviefun.sts;

import org.apache.johnzon.mapper.JohnzonIgnore;
import org.apache.johnzon.mapper.JohnzonProperty;
import org.apache.johnzon.mapper.Mapper;
import org.apache.johnzon.mapper.MapperBuilder;

import javax.ws.rs.core.NewCookie;
import javax.xml.bind.annotation.XmlRootElement;
import java.beans.ConstructorProperties;
import java.io.Serializable;
import java.util.UUID;

/**
 * Bean representation of a Access Token response. See <a
 * href="https://tools.ietf.org/html/draft-ietf-oauth-v2-30#section-4.1.3">this
 * section</a> of the spec for more info.
 */

@XmlRootElement
public class TokenResponse implements Serializable {
    @JohnzonProperty("access_token")
    private String accessToken;

    @JohnzonProperty("token_type")
    private String tokenType;

    @JohnzonProperty("expires_in")
    private long expiresIn;

    @JohnzonProperty("refresh_token")
    private String refreshToken;

    @JohnzonProperty("id_token")
    private String idToken;

    private String scope;

    public TokenResponse() {
    }

    @ConstructorProperties({"accessToken", "tokenType", "expiresIn", "refreshToken", "scope"})
    public TokenResponse(final String accessToken, final String tokenType, final long expiresIn, final String refreshToken, final String scope) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.expiresIn = expiresIn;
        this.refreshToken = refreshToken;
        this.scope = scope;
        this.idToken = UUID.randomUUID().toString();
    }

    @Override
    public String toString() {
        return "TokenResponse{" +
                "accessToken='" + accessToken + '\'' +
                ", tokenType='" + tokenType + '\'' +
                ", expiresIn=" + expiresIn +
                ", refreshToken='" + refreshToken + '\'' +
                ", idToken='" + idToken + '\'' +
                ", scope='" + scope + '\'' +
                '}';
    }

    public String getAccessToken() {
        return accessToken;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public String getIdToken() {
        return idToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getScope() {
        return scope;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    @JohnzonIgnore
    public NewCookie toCookie() {
        final Mapper mapper = new MapperBuilder().build();
        return new NewCookie("authorization", mapper.writeObjectAsString(this));
    }
}