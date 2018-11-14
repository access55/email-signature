<template>
  <v-app class="signature">
    <v-content fill-height>
      <access-logo class="logo" />
      <v-container fluid>
        <v-layout>
          <v-flex sm4 pa-2>
            <v-card class="elevation-1">
              <v-card-text>
                <v-form>
                  <v-text-field
                    ref="start"
                    tabindex="1"
                    v-model="name"
                    label="Fullname"
                    autocomplete="new-name"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    tabindex="2"
                    v-model="title"
                    label="Job Title"
                    autocomplete="new-title"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    tabindex="3"
                    v-model="phone1"
                    label="Phone #1"
                    autocomplete="new-phone1"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    tabindex="4"
                    v-model="phone2"
                    label="Phone #2"
                    autocomplete="new-phone2"
                    type="text"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex">
                <v-btn
                  ref="copy"
                  class="js-copy"
                  color="primary"
                  @click.native.prevent
                  data-clipboard-target="#source"
                >
                  COPY
                </v-btn>
                <v-btn color="secondary" ref="copySrc" class="js-copy-src">
                  COPY HTML
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex sm8 pa-2>
            <v-card class="elevation-1" height="100%">
              <div class="signature__source">
                <div ref="sourceWrapper">
                  <table
                    id="source"
                    cellpadding="0"
                    cellspacing="0"
                    style="font-family:Helvetica, Arial, sans-serif;font-size:14px;font-weight:normal;color:#37474f;text-align:left;line-height:20px;"
                  >
                    <tr>
                      <td style="font-size:0px;">
                        <a tabindex="-1" href="https://access55.com">
                          <img
                            src="https://ci4.googleusercontent.com/proxy/c_Tb8a8x3fwnjoZEMKdwCX13K9nxLbqhU3rofk7kL7hG6N2yqYpTCtmXvNK9sB6nhA32QJoxsjhdEiJ8-IPj_GTdymUQC5n1BaTviX3gd1kMNnk_Cweh-vVTBFu2yeFiPDuWyQ0tfg=s0-d-e1-ft#https://s3.amazonaws.com/dashboard-media-staging.access55.com/default/email_logo.png"
                            border="0"
                            width="100"
                            style="padding-top: 8px;"
                          />
                        </a>
                      </td>
                      <td style="padding-left:10px;">
                        <span style="font-weight: bold; color: #2a3844;">
                          {{ name || "John Doe" }}</span
                        >
                        <br />
                        <span style="color: #78909c;">
                          {{ title || "My great job title" }}</span
                        >
                        <br />
                        <a tabindex="-1" :href="tel1" style="color:#30a0e7;">
                          {{ phone1 || "98765 4321" }}</a
                        >&nbsp;
                        <span v-if="phone2" style="color:#999;">|&nbsp;</span
                        ><a tabindex="-1" :href="tel2" style="color:#30a0e7;">{{
                          phone2
                        }}</a>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid>
        <v-layout>
          <v-flex sm6 pa-2>
            <v-card class="elevation-1 signature__step">
              <img src="@/assets/step1.gif" />
            </v-card>
          </v-flex>
          <v-flex sm6 pa-2>
            <v-card class="elevation-1 signature__step">
              <img src="@/assets/step2.gif" />
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar timeout="1000" v-model="feedback" color="success">
      Copied!
    </v-snackbar>
  </v-app>
</template>
<script>
import AccessLogo from "@/components/Logo";
import Clipboard from "clipboard";
export default {
  components: {
    AccessLogo
  },
  data: () => ({
    feedback: false,
    name: "",
    title: "",
    email: "",
    phone1: "",
    phone2: ""
  }),
  computed: {
    tel1() {
      return `tel:${this.phone1.replace(/ /g, "").replace(/\D/g, "")}`;
    },
    tel2() {
      return `tel:${this.phone2.replace(/ /g, "").replace(/\D/g, "")}`;
    }
  },
  mounted() {
    this.$refs.start.focus();

    const signatureClipboard = new Clipboard(".js-copy");

    const signatureHTMLClipboard = new Clipboard(".js-copy-src", {
      text: () => {
        return this.$refs.sourceWrapper.innerHTML;
      }
    });

    signatureClipboard.on("success", () => {
      this.feedback = true;
    });
    signatureHTMLClipboard.on("success", () => {
      this.feedback = true;
    });
  },
  props: {
    source: String
  }
};
</script>
<style lang="scss">
$primary: #30a0e7;
$copy: #2a3844;
$secondary: #c7c4f8;
$third: #665ef1;
$purple: $third;
$blue: $primary;
$black: $copy;

html {
  height: 100%;
  box-sizing: content-box;

  *,
  *:before,
  *:after {
    box-sizing: content-box;
  }
}

body {
  margin: 0;
  padding: 0;
  background: #fafafa;
}

#app {
  font-family: "Avenirblack", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $copy;
}

.logo {
  display: block;
  margin: 40px auto 20px;
}

.signature {
  max-width: 960px;
  margin: 0 auto;
  &__output {
    flex: 1;
  }

  &__source {
    border: 2px dashed $secondary;
    height: 100%;
    display: flex;
    position: relative;
    > div {
      margin: auto;
    }
  }

  &__step {
    display: flex;

    img {
      width: 100%;
      height: auto;
      margin: auto;
      padding: 4px 4px 0;
    }
  }
}
</style>
